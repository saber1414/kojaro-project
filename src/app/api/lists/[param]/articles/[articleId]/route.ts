import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { List } from "@/models/Index";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ param: string, articleId: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به حذف مقاله از لیست می باشد"
            }, { status: 401 })
        };

        const { param, articleId } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "شناسه مقاله معتبر نیست"
            }, { status: 400 })
        };

        const list = await List.findById(param);
        if (!list) {
            return NextResponse.json({
                success: false,
                message: "لیست یافت نشد"
            }, { status: 404 })
        };

        const before = list.articles.length;

        list.articles = list.articles.filter((item: any) => item.article.toString() !== articleId);

        if (list.articles.length === before) {
            return NextResponse.json({
                success: false,
                message: "مقاله در این لیست موجود نیست"
            }, { status: 404 })
        };

        await list.save();

        return NextResponse.json({
            success: true,
            message: "مقاله از لیست حذف شد"
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Delete Artile To List =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف مقاله از لیست",
            errrors: err
        }, { status: 500 })
    }
};