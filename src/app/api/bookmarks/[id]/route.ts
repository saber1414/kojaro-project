import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Bookmark } from "@/models/Index";
import { updatedBookmarkSchema } from "@/validations/bookmarkSchema";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await ConnectedDB()

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const { id } = await params;
        if (!isObjectId(id)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const bookmark = await Bookmark.findById(id);
        if (!bookmark) {
            return NextResponse.json({
                success: false,
                message: 'لیست بوکمارک یافت نشد'
            }, { status: 404 })
        };

        const body = await req.json();
        const { note, articles } = body;

        const query: any = {};

        if (note) query.note = note;
        if (articles) query.articles = articles;

        try {
            await updatedBookmarkSchema.validate({
                note: query.note ?? bookmark.note,
                articles: query.articles ?? bookmark.articles,
            }, { abortEarly: false })
        } catch (err: any) {
            console.log("Err =>", err);
            return NextResponse.json({
                success: false,
                message: "اطلاعات وارد شده معتبر نیست"
            }, { status: 400 })
        };

        const updateData = await Bookmark.findByIdAndUpdate(id, query, { new: true })
            .select("-__v")
            .lean();

        return NextResponse.json({
            success: true,
            message: "لیست بوکمارک ویرایش شد",
            data: updateData
        }, { status: 200 });
    } catch (err: any) {
        console.log("Error Update Bookmark List =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ویرایش لیست بوکمارک",
            errors: err
        }, { status: 500 })
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const { id } = await params;
        if (!isObjectId(id)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const bookmark = await Bookmark.findById(id);
        if (!bookmark) {
            return NextResponse.json({
                success: false,
                message: 'لیست بوکمارک یافت نشد'
            }, { status: 404 })
        };

        await Bookmark.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "لیست بوکمارک حذف شد"
        }, { status: 200 })
    } catch (err: any) {
        console.log("Error Delete Bookmark List =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف لیست بوکمارک",
            errors: err
        }, { status: 500 })
    }
};