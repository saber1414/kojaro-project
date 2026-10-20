import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { articleCategorySchema } from "@/validations/articleCategorySchema";
import { ArticleCategory } from "@/models/Index"
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10", 10)));
        const skip = (page - 1) * limit;

        const search = searchParams.get("search");

        const query: any = {};

        if (search) query.$text = { $search: search };

        const articleCategories = await ArticleCategory.find(query)
            .limit(limit)
            .skip(skip)
            .select("-__v")
            .lean();

        const total = await ArticleCategory.countDocuments();

        return NextResponse.json({
            success: true,
            data: {
                articleCategories,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit) || 1,
                    hasNextPage: page * limit < total,
                    hasPrevPage: page > 1
                }
            }
        }, { status: 200 })

    } catch (err: any) {
        console.log("Err article category =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت دسته بندی ها",
            errors: err
        }, { status: 500 })
    }
};

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || !["admin", "author"].includes(admin.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر و نویسنده مجاز به ایجاد دسته بندی می باشند"
            }, { status: 401 })
        };

        const body = await req.json();

        const { name, slug } = body;

        await articleCategorySchema.validate(body, { abortEarly: false });

        const data = { name, slug };

        const existingCategory = await ArticleCategory.findOne({
            $or: [
                { name: data.name },
                { slg: data.slug }
            ]
        });

        if (existingCategory) {
            return NextResponse.json({
                success: false,
                message: "نام یا مسیر دسته بندی تکرای می باشد"
            }, { status: 409 })
        };

        const createCategory = await ArticleCategory.create(data)

        return NextResponse.json({
            success: true,
            message: "دسته بندی باموفقیت ایجاد شد",
            data: createCategory
        }, { status: 201 })

    } catch (err: any) {
        console.log("Error create category =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد دسته بندی",
            errors: err
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
                message: "دسترسی غیرمجاز می باشد"
            }, { status: 401 })
        };

        const body = await req.json();

        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const validIds = ids.filter((id) => Types.ObjectId.isValid(id));

        if (validIds.length === 0) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const articlesCategory = await ArticleCategory.find({
            _id: { $in: validIds }
        }).select("_id author coverImage");

        if (!articlesCategory) {
            return NextResponse.json({
                success: false,
                message: "دسته بندی مقاله یافت نشد"
            }, { status: 404 })
        };

        let allowed = articlesCategory;

        if (user.role === "author") {
            const userId = user._id.toString();

            allowed = articlesCategory.filter((category) => {
                const ownerId = category.author !== null ?
                    typeof category.author === "object" ? (category.author)._id?.toString() ?? String(category.author) : String(category.author) : null;

                return ownerId === userId
            })
        };

        if (allowed.length === 0) {
            return NextResponse.json({
                success: false,
                message: "شما فقط می توانید دسته بندی خودتان را حذف کنید"
            }, { status: 403 })
        };

        const result = await ArticleCategory.deleteMany({
            _id: { $in: validIds }
        });

        return NextResponse.json({
            success: false,
            message: "دسته بندی مقاله باموفقیت حذف شد",
            data: result
        }, { status: 200 });
    } catch (err: any) {
        console.log("Error Delete Category =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف دسته بندی"
        }, { status: 500 })
    }
};