import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import { sanitizeContent } from "@/utils/sanitize";
import { Article, ArticleReaction, Category, Comment } from "@/models/Index";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";
import { articleSchema } from "@/validations/articleSchema";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();
        const { param } = await params;

        let article;

        if (isObjectId(param)) {
            article = await Article.findById(param)
                .populate("author", "fullname username image")
                .populate("categories", "name slug icon")
                .populate("articleCategory", "name slug")
                .select("-__v")
                .lean();
        } else {
            article = await Article.findOne({ slug: param })
                .populate("author", "fullname username image")
                .populate("categories", "name slug icon")
                .populate("articleCategory", "name slug")
                .select("-__v")
                .lean();
        };

        if (!article) {
            return NextResponse.json(
                { success: false, message: "مقاله یافت نشد" },
                { status: 404 }
            );
        };

        const user = await authenticate(req).catch(() => null);

        if (article.status !== "published") {
            const authorId =
                typeof article.author === "object"
                    ? article.author._id?.toString()
                    : article.author?.toString();

            if (
                !user ||
                (user.role !== "admin" && user._id.toString() !== authorId)
            ) {
                return NextResponse.json(
                    { success: false, message: "مقاله یافت نشد" },
                    { status: 404 }
                );
            }
        };

        let userReaction: "like" | "dislike" | null = null;
        if (user) {
            const reaction = await ArticleReaction.findOne({
                user: user._id,
                article: article._id
            })
                .select("type")
                .lean();

            userReaction = reaction?.type ?? null;
        }

        const comments = await Comment.find({
            article: article._id,
            parentComment: null,
            status: "approved",
            isDeleted: false,
        })
            .sort({ isPinned: -1, createdAt: -1 })
            .populate("author", "fullname username image role")
            .lean();

        const commentIds = comments.map((c) => c._id);
        const replies = await Comment.find({
            parentComment: { $in: commentIds },
            status: "approved",
            isDeleted: false,
        })
            .sort({ createdAt: 1 })
            .populate("author", "fullname username image role")
            .lean();

        const repliesMap = new Map<string, any[]>();
        for (const reply of replies) {
            const key = reply.parentComment?.toString();
            if (!key) continue;
            if (!repliesMap.has(key)) repliesMap.set(key, []);
            repliesMap.get(key)!.push(reply);
        }

        const commentsTree = comments.map((c) => ({
            ...c,
            replies: repliesMap.get(c._id.toString()) || [],
        }));

        if (article.status === "published") {
            await Article.findByIdAndUpdate(article._id, { $inc: { views: 1 } });
            article.views += 1;
        };

        return NextResponse.json(
            {
                success: true,
                data: {
                    ...article,
                    categories: article.categories || [],
                    comments: commentsTree,
                    likeCount: article.likeCount ?? 0,
                    dislikeCount: article.dislikeCount ?? 0,
                    userReaction,
                },
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("Get article error =>", err);
        return NextResponse.json(
            { success: false, message: "خطا در دریافت مقاله" },
            { status: 500 }
        );
    }
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const { param } = await params;
        if (!isObjectId(param)) {
            return NextResponse.json(
                { success: false, message: "برای ویرایش از id استفاده کنید" },
                { status: 400 }
            );
        };

        const user = await authenticate(req);
        if (!user || !["admin", "author"].includes(user.role)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "فقط مدیر و نویسنده مجاز به ویرایش مقاله هستند",
                },
                { status: 401 }
            );
        };

        const article = await Article.findById(param);
        if (!article) {
            return NextResponse.json(
                { success: false, message: "مقاله یافت نشد" },
                { status: 404 }
            );
        };

        if (
            user.role === "author" &&
            article.author.toString() !== user._id.toString()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "شما فقط می‌توانید مقالات خودتان را ویرایش کنید",
                },
                { status: 403 }
            );
        };

        const formData = await req.formData();

        const title = formData.get("title") as string | null;
        const slug = formData.get("slug") as string | null;
        const excerpt = formData.get("excerpt") as string | null;
        const content = formData.get("content") as string | null;
        const articleCategory = formData.get("articleCategory") as string | null;
        const status = formData.get("status") as string | null;
        const isFeaturedRaw = formData.get("isFeatured");
        const metaTitle = formData.get("metaTitle") as string | null;
        const metaDescription = formData.get("metaDescription") as string | null;
        const tagsRaw = formData.get("tags") as string | null;
        const categoriesRaw = formData.get("categories") as string | null;
        const singleCategory = formData.get("category") as string | null;
        const coverImage = formData.get("coverImage") as File | null;
        const removeCover = formData.get("removeCover") === "true";

        const updatedData: Record<string, unknown> = {};

        if (title) updatedData.title = title.trim();
        if (slug) updatedData.slug = slug.trim().toLowerCase();
        if (excerpt !== null) updatedData.excerpt = excerpt.trim() || null;

        if (content) {
            const cleanContent = sanitizeContent(content);
            updatedData.content = cleanContent;
            updatedData.readingTime = calculateReadingTime(cleanContent);
        };

        if (isFeaturedRaw !== null) {
            updatedData.isFeatured =
                isFeaturedRaw === "true" || isFeaturedRaw === "1";
        };

        if (metaTitle !== null) {
            updatedData.metaTitle = metaTitle.trim() || null;
        };
        if (metaDescription !== null) {
            updatedData.metaDescription = metaDescription.trim() || null;
        };

        if (articleCategory) {
            if (!Types.ObjectId.isValid(articleCategory)) {
                return NextResponse.json(
                    { success: false, message: "شناسه دسته‌بندی مقاله نامعتبر است" },
                    { status: 400 }
                );
            }
            updatedData.articleCategory = articleCategory;
        };

        if (status && ["draft", "published", "archived"].includes(status)) {
            updatedData.status = status;
            if (status === "published" && article.status !== "published") {
                updatedData.publishedAt = new Date();
            }
        };

        if (tagsRaw) {
            try {
                updatedData.tags = JSON.parse(tagsRaw);
            } catch {
                updatedData.tags = tagsRaw
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean);
            }
        };

        let categoriesIds: string[] | null = null;

        if (categoriesRaw) {
            try {
                const parsed = JSON.parse(categoriesRaw);
                categoriesIds = Array.isArray(parsed)
                    ? parsed.map(String).filter(Boolean)
                    : [String(parsed)];
            } catch {
                const all = formData.getAll("categories");
                categoriesIds = all.length
                    ? all.map(String).filter(Boolean)
                    : [categoriesRaw];
            }
        } else if (singleCategory) {
            categoriesIds = [singleCategory];
        };

        if (categoriesIds) {
            if (categoriesIds.length === 0) {
                return NextResponse.json(
                    { success: false, message: "حداقل یک منو الزامی است" },
                    { status: 400 }
                );
            };

            const invalidFormat = categoriesIds.filter(
                (id) => !Types.ObjectId.isValid(id)
            );
            if (invalidFormat.length) {
                return NextResponse.json(
                    { success: false, message: "شناسه منو نامعتبر است" },
                    { status: 400 }
                );
            };

            const found = await Category.find({ _id: { $in: categoriesIds } })
                .select("_id")
                .lean();

            if (found.length !== categoriesIds.length) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "یک یا چند منوی انتخابی معتبر نیستند",
                    },
                    { status: 404 }
                );
            }

            updatedData.categories = categoriesIds;
        };

        if (removeCover) {
            if (article.coverImage) {
                const oldPath = path.join(process.cwd(), "public", article.coverImage);
                await fs.unlink(oldPath).catch(() => { });
            }
            updatedData.coverImage = null;
        } else if (coverImage && coverImage.size > 0) {
            const allowedTypes = [
                "image/png",
                "image/jpg",
                "image/jpeg",
                "image/webp",
            ];
            if (!allowedTypes.includes(coverImage.type)) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "فرمت کاور باید jpg, png یا webp باشد",
                    },
                    { status: 422 }
                );
            }
            if (coverImage.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "حجم فایل نباید بیشتر از ۵ مگ باشد",
                    },
                    { status: 422 }
                );
            };

            if (article.coverImage) {
                const oldPath = path.join(process.cwd(), "public", article.coverImage);
                await fs.unlink(oldPath).catch(() => { });
            };

            const ext = path.extname(coverImage.name);
            const filename = `article_${uuidv4()}${ext}`;
            const uploadDir = path.join(
                process.cwd(),
                "public",
                "uploads",
                "articles"
            );
            await fs.mkdir(uploadDir, { recursive: true });
            await fs.writeFile(
                path.join(uploadDir, filename),
                Buffer.from(await coverImage.arrayBuffer())
            );
            updatedData.coverImage = `/uploads/articles/${filename}`;
        };

        const categoriesForValidate =
            (updatedData.categories as string[] | undefined) ??
            (Array.isArray(article.categories)
                ? article.categories.map((c: any) => c.toString())
                : []);

        try {
            await articleSchema.validate(
                {
                    title: (updatedData.title as string) ?? article.title,
                    slug: (updatedData.slug as string) ?? article.slug,
                    content: (updatedData.content as string) ?? article.content,
                    categories: categoriesForValidate,
                    articleCategory:
                        (updatedData.articleCategory as string) ??
                        article.articleCategory?.toString(),
                    status: (updatedData.status as string) ?? article.status,
                },
                { abortEarly: false }
            );
        } catch (err: any) {
            return NextResponse.json(
                {
                    success: false,
                    message: "اطلاعات وارد شده معتبر نیست",
                    errors: err.errors,
                },
                { status: 400 }
            );
        };

        if (updatedData.slug) {
            const slugExists = await Article.findOne({
                slug: updatedData.slug,
                _id: { $ne: param },
            });
            if (slugExists) {
                return NextResponse.json(
                    { success: false, message: "این slug قبلاً استفاده شده است" },
                    { status: 409 }
                );
            }
        };

        const updated = await Article.findByIdAndUpdate(param, updatedData, {
            new: true,
        })
            .populate("author", "fullname username image")
            .populate("categories", "name slug icon")
            .populate("articleCategory", "name slug")
            .select("-__v")
            .lean();

        return NextResponse.json(
            {
                success: true,
                message: "مقاله با موفقیت ویرایش شد",
                data: updated,
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("Update article error:", err);
        return NextResponse.json(
            {
                success: false,
                message: "خطا در ویرایش مقاله",
                error: err?.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user || !["admin", "author"].includes(user.role)) {
            return NextResponse.json({
                success: false,
                message: "دسترسی غیرمجاز"
            }, { status: 401 })
        };

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                succcess: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const article = await Article.findById(param);
        if (!article) {
            return NextResponse.json({
                success: false,
                message: "مقاله یافت نشد",
            }, { status: 404 })
        };

        if (user.role === "author") {
            const authorId = typeof article.author === "object" && article.author !== null ?
                article.author._id.toString() ?? article.author.toString()
                :
                String(article.author);

            if (authorId !== user._id.toString()) {
                return NextResponse.json({
                    success: false,
                    message: "شما فقط می توانید مقالات خودتان را حذف کنید"
                }, { status: 403 })
            }
        };

        if (article.coverImage) {
            const oldPath = path.join(process.cwd(), "public", article.coverImage);
            await fs.unlink(oldPath).catch(() => { })
        };

        await Article.findByIdAndDelete(param);

        return NextResponse.json({
            success: false,
            message: "مقاله باموفقیت حذف شد"
        }, { status: 200 })
    } catch (err: any) {
        console.log("Error Delete Article =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف مقاله",
            error: err
        }, { status: 500 })
    }
};