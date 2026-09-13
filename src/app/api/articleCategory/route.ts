import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { articleCategorySchema } from "@/validations/articleCategorySchema";
import { ArticleCategory } from "@/models/Index"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
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
                    totalPages: Math.ceil(total / limit),
                    hasPrevPages: (page * limit) < total,
                    hasNextPages: page > 1
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
}