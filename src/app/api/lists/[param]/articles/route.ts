import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { List, Article } from "@/models/Index";
import { addArticleToListSchema } from "@/validations/listSchema";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function POST(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به افزودن مقاله به لیست می باشد"
            }, { status: 401 })
        };

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "شناسه لیست معتبر نیست"
            }, { status: 400 })
        };

        const body = await req.json();
        const { articleId, order } = body;

        await addArticleToListSchema.validate(body, { abortEarly: false });

        const list = await List.findById(param);
        if (!list) {
            return NextResponse.json({
                success: false,
                message: "لیست یافت نشد"
            }, { status: 404 })
        };

        const article = await Article.findById(articleId);
        if (!article) {
            return NextResponse.json({
                success: false,
                message: "مقاله یافت نشد"
            }, { status: 404 })
        };

        const existingArticle = list.articles.some((item: any) => item.article.toString() === articleId);
        if (existingArticle) {
            return NextResponse.json({
                success: false,
                message: "این مقاله قبلا در لیست است"
            }, { status: 409 })
        };

        const nextOrder = typeof order === "number"
            ? order
            : list.articles.length > 0
                ? Math.max(...list.articles.map((article: any) => article.order))
                : 0;

        list.articles.push({
            article: new Types.ObjectId(articleId),
            order: nextOrder
        });

        await list.save();

        const populated = await List.findById(param)
            .populate({
                path: "articles.article",
                select: "title slug excerpt coverImage status views"
            })
            .lean();

        return NextResponse.json({
            success: true,
            message: "مقاله به لیست اضافه شد",
            data: populated
        }, { status: 200 })
    } catch (err: any) {
        console.log('Err Add Article To List =>', err);
        return NextResponse.json({
            success: false,
            message: "خطا در افزودن مقاله به لیست",
            errors: err
        }, { status: 500 })
    }
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به مرتب سازی لیست می باشد"
            }, { status: 401 })
        };

        const { param } = await params;
        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "شناسه لیست معتبر نیست"
            }, { status: 400 })
        };

        const { orders } = await req.json();

        if (!Array.isArray(orders)) {
            return NextResponse.json({
                success: false,
                message: "فزمت معتبر نیست"
            }, { status: 400 })
        };

        const list = await List.findById(param);
        if (!list) {
            return NextResponse.json({
                success: false,
                message: "لیست یافت نشد"
            }, { status: 404 })
        };

        for (const item of orders) {
            const found = list.articles.find((a: any) => a.article.toString() === item.articleId);
            if (found && typeof item.order === "number") {
                found.order = item.order
            }
        };

        list.articles.sort((a: any, b: any) => a.order - b.order);

        await list.save();

        return NextResponse.json({
            success: true,
            message: "ترتیب مقالات بروزرسانی شد",
            data: list
        }, { status: 200 });

    } catch (err: any) {
        console.log("Error Sorting List =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در مرتب شازی لیست"
        }, { status: 500 })
    }
};


