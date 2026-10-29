import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import { sanitizeContent } from "@/utils/sanitize";
import { Article, ArticleCategory, Category } from "@/models/Index";
import { articleSchema } from "@/validations/articleSchema";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";

// export async function POST(req: NextRequest) {
//     try {
//         await ConnectedDB();

//         const admin = await authenticate(req);
//         if (!admin || !["admin", "author"].includes(admin.role)) {
//             return NextResponse.json({
//                 success: false,
//                 message: "فقط مدیر و نویسنده مجاز به ایجاد مقاله هستند"
//             }, { status: 401 })
//         };

//         const formData = await req.formData();

//         const title = formData.get("title") as string | null;
//         const slug = formData.get("slug") as string | null;
//         const excerpt = formData.get("excerpt") as string | null;
//         const content = formData.get("content") as string | null;
//         const articleCategory = formData.get("articleCategory") as string | null;
//         const status = (formData.get("status") as string) || "draft";
//         const metaTitle = formData.get("metaTitle") as string | null;
//         const metaDescription = formData.get("metaDescription") as string | null;
//         const tagsRaw = formData.get("tags") as string | null;
//         const coverImage = formData.get("coverImage") as File | null;
//         const categoriesRaw = formData.get("categories") as string | null;

//         let tags: string[] = [];

//         if (tagsRaw) {
//             try {
//                 tags = JSON.parse(tagsRaw)
//             } catch {
//                 tags = tagsRaw.split(",").map((tag) => tag.trim()).filter(Boolean);
//             }
//         };

//         let categories: string[] = [];

//         if (categoriesRaw) {
//             try {
//                 const parsed = JSON.parse(categoriesRaw);
//                 categories = Array.isArray(parsed)
//                     ? parsed.map(String).filter(Boolean)
//                     : [String(parsed)];
//             } catch {
//                 const all = formData.getAll("categories");
//                 categories = all.map(String).filter(Boolean);
//             }
//         }

//         let coverImagePath: string | undefined | null = null;

//         if (coverImage && coverImage.size > 0) {
//             const allowedTypes = ["image/webp", "image/png", "image/jpg", "image/jpeg", "image/svg+xml"];
//             if (!allowedTypes.includes(coverImage.type)) {
//                 return NextResponse.json({
//                     success: false,
//                     message: "فرمت کاور باید jpg, png یا webp باشد"
//                 }, { status: 422 })
//             };

//             if (coverImage.size > 5 * 1024 * 1024) {
//                 return NextResponse.json({
//                     success: false,
//                     message: "حجم کاور نباید بیشتر از 5 مگ بشتر باشد"
//                 }, { status: 422 })
//             };

//             const ext = path.extname(coverImage.name);
//             const filename = `article_${uuidv4()}${ext}`;
//             const uploadDir = path.join(process.cwd(), "public", "uploads", "articles");

//             await fs.mkdir(uploadDir, { recursive: true });

//             const fullPath = path.join(uploadDir, filename);

//             await fs.writeFile(fullPath, Buffer.from(await coverImage.arrayBuffer()));

//             coverImagePath = `/uploads/articles/${filename}`;
//         };

//         const cleanContent = sanitizeContent(content || "");

//         const data = {
//             title: title?.trim(),
//             slug: slug?.trim()?.toLowerCase(),
//             excerpt: excerpt?.trim() || null,
//             content: cleanContent,
//             categories,
//             articleCategory,
//             tags,
//             status,
//             metaTitle: metaTitle?.trim() || null,
//             metaDescription: metaDescription?.trim() || null,
//             coverImage: coverImagePath,
//         };

//         try {
//             await articleSchema.validate(data, { abortEarly: false });
//         } catch (err: any) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: "اطلاعات وارد شده معتبر نیست",
//                     errors: err.errors,
//                 },
//                 { status: 400 }
//             );
//         };

//         if (!Types.ObjectId.isValid(data.category!)) {
//             return NextResponse.json(
//                 { success: false, message: "شناسه دسته‌بندی نامعتبر است" },
//                 { status: 400 }
//             );
//         };

//         const categoryExists = await Category.findById(data.category);
//         if (!categoryExists) {
//             return NextResponse.json({
//                 success: false,
//                 message: "دسته بندی یافت نشد"
//             }, { status: 404 })
//         };

//         const existingSlug = await Article.findOne({ slug: data.slug });
//         if (existingSlug) {
//             return NextResponse.json(
//                 { success: false, message: "این slug قبلاً استفاده شده است" },
//                 { status: 409 }
//             );
//         };

//         const readingTime = calculateReadingTime(data.content);

//         const article = await Article.create({
//             ...data,
//             author: admin._id,
//             readingTime,
//             publishedAt: data.status === "published" ? new Date() : null
//         });

//         const populated = await Article.findById(article._id)
//             .populate("author", "fullname username image")
//             .populate("category", "name slug icon")
//             .populate("articleCategory", "name slug")
//             .select("-__v")
//             .lean()

//         return NextResponse.json({
//             success: true,
//             message: "مقاله با موفقیت ایجاد شد",
//             data: populated
//         }, { status: 201 })

//     } catch (err: any) {
//         return NextResponse.json({
//             success: false,
//             message: "خطا در ایجاد مقاله"
//         }, { status: 500 })
//     }
// };

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || !["admin", "author"].includes(admin.role)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "فقط مدیر و نویسنده مجاز به ایجاد مقاله هستند",
                },
                { status: 401 }
            );
        };

        const formData = await req.formData();

        const title = formData.get("title") as string | null;
        const slug = formData.get("slug") as string | null;
        const excerpt = formData.get("excerpt") as string | null;
        const content = formData.get("content") as string | null;
        const articleCategory = formData.get("articleCategory") as string | null;
        const status = (formData.get("status") as string) || "draft";
        const metaTitle = formData.get("metaTitle") as string | null;
        const metaDescription = formData.get("metaDescription") as string | null;
        const tagsRaw = formData.get("tags") as string | null;
        const categoriesRaw = formData.get("categories") as string | null;
        const singleCategory = formData.get("category") as string | null;
        const coverImage = formData.get("coverImage") as File | null;

        let tags: string[] = [];
        if (tagsRaw) {
            try {
                tags = JSON.parse(tagsRaw);
            } catch {
                tags = tagsRaw
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean);
            }
        };

        let categories: string[] = [];
        if (categoriesRaw) {
            try {
                const parsed = JSON.parse(categoriesRaw);
                categories = Array.isArray(parsed)
                    ? parsed.map(String).filter(Boolean)
                    : [String(parsed)];
            } catch {
                categories = formData.getAll("categories").map(String).filter(Boolean);
            }
        } else if (singleCategory) {
            categories = [singleCategory];
        };

        let coverImagePath: string | null = null;
        if (coverImage && coverImage.size > 0) {
            const allowedTypes = [
                "image/webp",
                "image/png",
                "image/jpg",
                "image/jpeg",
                "image/svg+xml",
            ];
            if (!allowedTypes.includes(coverImage.type)) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "فرمت کاور باید jpg, png یا webp باشد",
                    },
                    { status: 422 }
                );
            };
            if (coverImage.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "حجم کاور نباید بیشتر از ۵ مگ باشد",
                    },
                    { status: 422 }
                );
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
            coverImagePath = `/uploads/articles/${filename}`;
        }

        const cleanContent = sanitizeContent(content || "");

        const data = {
            title: title?.trim(),
            slug: slug?.trim()?.toLowerCase(),
            excerpt: excerpt?.trim() || null,
            content: cleanContent,
            categories,
            articleCategory,
            tags,
            status,
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

        if (!categories.length) {
            return NextResponse.json(
                { success: false, message: "حداقل یک منو الزامی است" },
                { status: 400 }
            );
        };

        const invalidCategories = categories.filter(
            (id) => !Types.ObjectId.isValid(id)
        );
        if (invalidCategories.length) {
            return NextResponse.json(
                { success: false, message: "شناسه منو نامعتبر است" },
                { status: 400 }
            );
        };

        const foundMenus = await Category.countDocuments({
            _id: { $in: categories },
        });
        if (foundMenus !== categories.length) {
            return NextResponse.json(
                { success: false, message: "یک یا چند منو یافت نشد" },
                { status: 404 }
            );
        };

        if (!articleCategory || !Types.ObjectId.isValid(articleCategory)) {
            return NextResponse.json(
                { success: false, message: "شناسه دسته‌بندی مقاله نامعتبر است" },
                { status: 400 }
            );
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
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            categories: data.categories,
            articleCategory: data.articleCategory,
            tags: data.tags,
            status: data.status,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            coverImage: data.coverImage,
            author: admin._id,
            readingTime,
            publishedAt: data.status === "published" ? new Date() : null,
        });

        const populated = await Article.findById(article._id)
            .populate("author", "fullname username image")
            .populate("categories", "name slug icon")
            .populate("articleCategory", "name slug")
            .select("-__v")
            .lean();

        return NextResponse.json(
            {
                success: true,
                message: "مقاله با موفقیت ایجاد شد",
                data: populated,
            },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("Create article error:", err);
        return NextResponse.json(
            {
                success: false,
                message: "خطا در ایجاد مقاله",
                error: err?.message,
            },
            { status: 500 }
        );
    }
};

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
        const skip = (page - 1) * limit;

        const search = searchParams.get("search")?.trim() || "";
        const category = searchParams.get("category")?.trim() || "";
        const status = searchParams.get("status")?.trim() || "";
        const author = searchParams.get("author")?.trim() || "";
        const isFeatured = searchParams.get("isFeatured");
        const sort = searchParams.get("sort") || "newest";

        const user = await authenticate(req).catch(() => null);

        const andConditions: any[] = [];

        if (!user || !["admin", "author"].includes(user.role)) {
            andConditions.push({ status: "published" });
        } else if (status && ["draft", "published", "archived"].includes(status)) {
            andConditions.push({ status });
        } else if (user.role === "author") {
            andConditions.push({
                $or: [{ status: "published" }, { author: user._id }],
            });
        }

        if (search) {
            andConditions.push({
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { slug: { $regex: search, $options: "i" } },
                    { excerpt: { $regex: search, $options: "i" } },
                ],
            });
        }

        if (category && Types.ObjectId.isValid(category)) {
            andConditions.push({
                $or: [{ category }, { categories: category }],
            });
        }

        if (author && Types.ObjectId.isValid(author)) {
            andConditions.push({ author });
        }

        if (isFeatured === "true") andConditions.push({ isFeatured: true });
        if (isFeatured === "false") andConditions.push({ isFeatured: false });

        const query = andConditions.length ? { $and: andConditions } : {};

        let sortOption: Record<string, 1 | -1> = { publishedAt: -1, createdAt: -1 };
        if (sort === "oldest") sortOption = { publishedAt: 1, createdAt: 1 };
        if (sort === "title") sortOption = { title: 1 };
        if (sort === "views") sortOption = { views: -1 };

        const [total, articles] = await Promise.all([
            Article.countDocuments(query),
            Article.find(query)
                .populate("author", "fullname username image")
                .populate("categories", "name slug icon")
                .populate("articleCategory", "name slug")
                .select("-__v")
                .sort(sortOption)
                .skip(skip)
                .limit(limit)
                .lean(),
        ]);

        return NextResponse.json(
            {
                success: true,
                data: {
                    articles,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit) || 1,
                        hasNextPage: page * limit < total,
                        hasPrevPage: page > 1,
                    },
                },
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("GET articles error:", err);
        return NextResponse.json(
            {
                success: false,
                message: "خطا در دریافت مقالات",
                error: err?.message,
            },
            { status: 500 }
        );
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
                await fs.unlink(oldPath).catch(() => { });
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
        console.log("Error Delete Articles =>", err)
        return NextResponse.json({
            success: false,
            message: "خطا در حذف مقالات",
            errors: err
        }, { status: 500 })
    }
};