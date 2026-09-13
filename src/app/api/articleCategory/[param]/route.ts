import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { updateArticleCategory } from "@/validations/articleCategorySchema";
import { ArticleCategory } from "@/models/Index"
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(_: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const { param } = await params;
        let category;

        if (isObjectId(param)) {
            category = await ArticleCategory.findById(param)
                .select("-__v")
                .lean()
        } else {
            category = await ArticleCategory.findOne({ slug: param })
                .select("-__v")
                .lean()
        };

        if (!category) {
            return NextResponse.json({
                success: false,
                message: "دسته بندی یافت نشد"
            }, { status: 404 })
        };


        return NextResponse.json({
            success: true,
            data: category
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Response Category =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت دسته بندی"
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
                message: "شناسه دسته بندی معتبر نیست"
            }, { status: 400 })
        };

        const admin = await authenticate(req);
        if (!admin || !["admin", "author"].includes(admin.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به میرایش می باشد"
            }, { status: 401 })
        };

        const category = await ArticleCategory.findById(param);
        if (!category) {
            return NextResponse.json({
                success: false,
                message: "دسته بندی یافت نشد"
            }, { status: 404 })
        };

        const body = await req.json();
        const updatedData: any = {};

        const { name, slug } = body;

        if (name) updatedData.name = name.trim();
        if (slug) updatedData.slug = slug.trim();

        try {
            await updateArticleCategory.validate({
                name: updatedData.title ?? category.name,
                slug: updatedData.slug ?? category.slug
            }, { abortEarly: false })
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

        const updated = await ArticleCategory.findByIdAndUpdate(param, updatedData, { new: true }).lean();

        return NextResponse.json({
            success: true,
            message: "دسته بندی باموفقیت ویرایش شد",
            data: updated
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Edit Category =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ویرایش دسته بندی"
        }, { status: 500 })
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "شناسه دسته بندی معتبر نیست"
            }, { status: 400 })
        };

        const admin = await authenticate(req);
        if (!admin || !["admin", "author"].includes(admin.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به میرایش می باشد"
            }, { status: 401 })
        };

        const category = await ArticleCategory.findById(param);
        if (!category) {
            return NextResponse.json({
                success: false,
                message: "دسته بندی یافت نشد"
            }, { status: 404 })
        };

        const updated = await ArticleCategory.findByIdAndDelete(param);

        return NextResponse.json({
            success: true,
            message: "دسته بندی باموفقیت حذف شد",
            data: updated
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Remove Category =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف دسته بندی"
        }, { status: 500 })
    }
};