import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import { sanitizeContent } from "@/utils/sanitize";
import { Article, Category } from "@/models/Index";
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
                .populate("category", "name slug icon")
                .select("-__v")
                .lean()
        } else {
            article = await Article.findOne({ slug: param })
                .populate("author", "fullname username image")
                .populate("category", "name slug icon")
                .select("-__v")
                .lean()
        };

        if (!article) {
            return NextResponse.json({
                success: false,
                message: "مقاله یافت نشد"
            }, { status: 404 })
        };

        const user = await authenticate(req).catch(() => { });

        if (article.status !== "published") {
            if (!user || (user.role !== "admin" && user._id.toString() !== article.author._id.toString())) {
                return NextResponse.json({
                    success: false,
                    message: "مقاله یافت نشد"
                }, { status: 400 })
            }
        };

        if (article.status === "published") {
            await Article.findByIdAndUpdate(article._id, { $inc: { views: 1 } });
            article.views += 1;
        };

        return NextResponse.json({
            success: true,
            data: article
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت مقاله",
            error: err
        }, { status: 500 })
    }
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const { param } = await params;
        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "برای ویرایش از id استفاده کنید",
            }, { status: 400 })
        }

        const user = await authenticate(req);
        if (!user || !["admin", "author"].includes(user.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر و نویسنده مجاز به ویرایش مقاله هستند"
            }, { status: 401 })
        };

        const article = await Article.findById(param);
        if (!article) {
            return NextResponse.json({
                success: false,
                message: "مقاله یافت نشد"
            }, { status: 404 })
        };

        if (user.role === "author" && article.author.toString() !== user._id.toString()) {
            return NextResponse.json({
                success: false,
                message: "شما فقط می‌توانید مقالات خودتان را ویرایش کنید"
            }, { status: 403 })
        };

        const formData = await req.formData();

        const title = formData.get("title") as string | null;
        const slug = formData.get("slug") as string | null;
        const excerpt = formData.get("excerpt") as string | null;
        const content = formData.get("content") as string | null;
        const category = formData.get("category") as string | null;
        const status = formData.get("status") as string | null;
        const isFeaturedRaw = formData.get("isFeatured");
        const metaTitle = formData.get("metaTitle") as string | null;
        const metaDescription = formData.get("metaDescription") as string | null;
        const tagsRaw = formData.get("tags") as string | null;
        const coverImage = formData.get("coverImage") as File | null;
        const removeCover = formData.get("removeCover") === "true";

        const updatedData: any = {};

        const cleanContent = sanitizeContent(content || "");

        if (title) updatedData.title = title.trim();
        if (slug) updatedData.slug = slug.trim();
        if (excerpt) updatedData.excerpt = excerpt.trim();
        if (isFeaturedRaw !== null) updatedData.isFeaturedRaw = isFeaturedRaw === "true";
        if (metaTitle !== null) updatedData.metaTitle = metaTitle.trim() || null;
        if (metaDescription !== null) updatedData.metaDescription.trim() || null;
        if (content) {
            updatedData.content = cleanContent;
            updatedData.readingTime = calculateReadingTime(content)
        };
        if (category) updatedData.category = category;
        if (status && ["draft", "published", "archived"].includes(status)) {
            updatedData.status = status;
            if (status === "published" || article.status !== "published") {
                updatedData.publishedAt = new Date()
            }
        };
        if (tagsRaw) {
            try {
                updatedData.tags = JSON.parse(tagsRaw)
            } catch {
                updatedData.tags = tagsRaw
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
            }
        };

        if (removeCover) {
            if (article.coverImage) {
                const oldPath = path.join(process.cwd(), "public", article.coverImage);
                await fs.unlink(oldPath).catch(() => { })
            }
        } else if (coverImage && coverImage.size > 0) {
            const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
            if (!allowedTypes.includes(coverImage.type)) {
                return NextResponse.json({
                    success: false,
                    message: "فرمت کاور باید jpg, png یا webp باشد"
                }, { status: 422 })
            };

            if (coverImage.size > 5 * 1024 * 1024) {
                return NextResponse.json({
                    success: false,
                    message: "حجم فایل نباید بیشتز از 5 مگ باشد"
                }, { status: 422 })
            };

            const ext = path.extname(coverImage.name);
            const filename = `article_${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "articles");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPath = path.join(uploadDir, filename);

            await fs.writeFile(fullPath, Buffer.from(await coverImage.arrayBuffer()));

            updatedData.coverImage = `/uploads/${filename}`;
        };

        try {
            await articleSchema.validate(
                {
                    title: updatedData.title ?? article.title,
                    slug: updatedData.slug ?? article.slug,
                    content: updatedData.content ?? article.content,
                    category: updatedData.category ?? article.category.toString(),
                    status: updatedData.status ?? article.status,
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

        if (updatedData.category) {
            const exists = await Category.findById(updatedData.category);
            if (!exists) {
                return NextResponse.json(
                    { success: false, message: "دسته‌بندی یافت نشد" },
                    { status: 404 }
                );
            }
        };

        const updated = await Article.findByIdAndUpdate(param, updatedData, {
            new: true,
        })
            .populate("author", "fullname username image")
            .populate("category", "name slug icon")
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
        return NextResponse.json({
            success: false,
            message: "خطا در ویرایش مقاله",
            error: err
        })
    }
};