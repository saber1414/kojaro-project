import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import { sanitizeContent } from "@/utils/sanitize";
import { Article, Category } from "@/models/Index";
import { articleSchema } from "@/validations/articleSchema";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || !["admin", "author"].includes(admin.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر و نویسنده مجاز به ایجاد مقاله هستند"
            }, { status: 401 })
        };

        const formData = await req.formData();

        const title = formData.get("title") as string | null;
        const slug = formData.get("slug") as string | null;
        const excerpt = formData.get("excerpt") as string | null;
        const content = formData.get("content") as string | null;
        const category = formData.get("category") as string | null;
        const status = (formData.get("status") as string) || "draft";
        const isFeatured = formData.get("isFeatured") === "true";
        const metaTitle = formData.get("metaTitle") as string | null;
        const metaDescription = formData.get("metaDescription") as string | null;
        const tagsRaw = formData.get("tags") as string | null;
        const coverImage = formData.get("coverImage") as File | null;

        let tags: string[] = [];

        if (tagsRaw) {
            try {
                tags = JSON.parse(tagsRaw)
            } catch {
                tags = tagsRaw.split(",").map((tag) => tag.trim()).filter(Boolean);
            }
        };

        let coverImagePath: string | undefined | null = null;

        if (coverImage && coverImage.size > 0) {
            const allowedTypes = ["image/webp", "image/png", "image/jpg", "image/jpeg", "image/svg+xml"];
            if (!allowedTypes.includes(coverImage.type)) {
                return NextResponse.json({
                    success: false,
                    message: "فرمت کاور باید jpg, png یا webp باشد"
                }, { status: 422 })
            };

            if (coverImage.size > 5 * 1024 * 1024) {
                return NextResponse.json({
                    success: false,
                    message: "حجم کاور نباید بیشتر از 5 مگ بشتر باشد"
                }, { status: 422 })
            };

            const ext = path.extname(coverImage.name);
            const filename = `article_${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "articles");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPath = path.join(uploadDir, filename);

            await fs.writeFile(fullPath, Buffer.from(await coverImage.arrayBuffer()));

            coverImagePath = `/uploads/articles/${filename}`;
        };

        const cleanContent = sanitizeContent(content || "");

        const data = {
            title: title?.trim(),
            slug: slug?.trim()?.toLowerCase(),
            excerpt: excerpt?.trim() || null,
            content: cleanContent,
            category,
            tags,
            status,
            isFeatured,
            metaTitle: metaTitle?.trim() || null,
            metaDescription: metaDescription?.trim() || null,
            coverImage: coverImagePath,
        };

        try {
            await articleSchema.validate(data, { abortEarly: false });
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

        if (!Types.ObjectId.isValid(data.category!)) {
            return NextResponse.json(
                { success: false, message: "شناسه دسته‌بندی نامعتبر است" },
                { status: 400 }
            );
        };

        const categoryExists = await Category.findById(data.category);
        if (!categoryExists) {
            return NextResponse.json({
                success: false,
                message: "دسته بندی یافت نشد"
            }, { status: 404 })
        };

        const existingSlug = await Article.findOne({ slug: data.slug });
        if (existingSlug) {
            return NextResponse.json(
                { success: false, message: "این slug قبلاً استفاده شده است" },
                { status: 409 }
            );
        };

        const readingTime = calculateReadingTime(data.content);

        const article = await Article.create({
            ...data,
            author: admin._id,
            readingTime,
            publishedAt: data.status === "published" ? new Date() : null
        });

        const populated = await Article.findById(article._id)
            .populate("author", "fullname username image")
            .populate("category", "name slug icon")
            .select("-__v")
            .lean()

        return NextResponse.json({
            success: true,
            message: "مقاله با موفقیت ایجاد شد",
            data: populated
        }, { status: 201 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد مقاله"
        }, { status: 500 })
    }
};

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
        const skip = (page - 1) * 10;

        const search = searchParams.get("search")?.trim() || "";
        const category = searchParams.get("category")?.trim() || "";
        const status = searchParams.get("status")?.trim() || "";
        const author = searchParams.get("author")?.trim() || "";
        const isFeatured = searchParams.get("isFeatured");
        const sort = searchParams.get("sort") || "newest";

        const user = await authenticate(req);

        const query: any = {};

        if (!user || !["admin", "author"].includes(user.role)) {
            query.status = "published"
        } else if (status && ["draft", "published", "archived"].includes(status)) {
            query.status = status;
        };

        if (user?.role === "author" && !status) {
            query.$or = [
                { status: "published" },
                { author: user._id }
            ];
        };

        if (search) query.$text = { $search: search };
        if (category && Types.ObjectId.isValid(category)) query.category = category;
        if (author && Types.ObjectId.isValid(author)) query.author = author;
        if (isFeatured === "true") query.isFeatured = true;
        if (isFeatured === "false") query.isFeatured = false;

        let sortOption: any = { publishedAt: 1, createdAt: 1 };

        if (sort === "oldest") sortOption = { publishedAt: 1, createdAt: 1 };
        if (sort === "title") sortOption = { title: 1 };
        if (sort === "view") sortOption = { view: -1 };

        const total = await Article.countDocuments(query);

        const articles = await Article.find(query)
            .populate("author", "fullname username image")
            .populate("category", "name slug icon")
            .select("-__v")
            .limit(limit)
            .sort(sortOption)
            .skip(skip)
            .lean();

        return NextResponse.json({
            success: true,
            data: {
                articles,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                    hasPrevPage: page * limit < total,
                    hasNextPage: page > 1
                }
            }
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت مقالات",
            error: err
        }, { status: 500 })
    }
};

export async function DELETE(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user || !["admin", "author"].includes(user.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر و نویسنده مجاز به حذف مقالات می باشند"
            }, { status: 401 })
        };

        const body = await req.json();

        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({
                success: false,
                message: "ایدی معتبر نیست"
            }, { status: 400 })
        };

        const validIds = ids.filter((id: string) => Types.ObjectId.isValid(id));

        if (validIds.length === 0) {
            return NextResponse.json({
                success: false,
                message: "id معتبر نیست"
            }, { status: 400 })
        };

        const articles = await Article.find({
            _id: { $in: validIds }
        }).select("_id author coverImage");

        if (articles.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "هیچ مقاله‌ای یافت نشد",
                },
                { status: 404 }
            );
        };

        let articlesToDelete = articles;

        if (user.role === "author") {
            articlesToDelete = articles.filter((article) => article.author.toString() === user._id.toString());

            if (articlesToDelete.length === 0) {
                return NextResponse.json({
                    success: false,
                    message: "شما فقط می‌توانید مقالات خودتان را حذف کنید"
                }, { status: 403 })
            }
        };

        const idsToDelete = articles.map((article) => article._id);

        for (const article of articlesToDelete) {
            if (article.coverImage) {
                const oldPath = path.join(process.cwd(), "public", article.coverImage);
                return await fs.unlink(oldPath).catch(() => { });
            }
        };

        const result = await Article.deleteMany({
            _id: { $in: idsToDelete }
        });

        return NextResponse.json({
            success: true,
            message: `${result.deletedCount} مقاله با موفقیت حذف شد`,
            data: {
                deletedCount: result.deletedCount,
                deletedIds: idsToDelete,
            }
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در حذف مقالات"
        }, { status: 500 })
    }
};