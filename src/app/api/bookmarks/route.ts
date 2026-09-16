import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Bookmark } from "@/models/Index";
import { bookmarkSchema } from "@/validations/bookmarkSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const bookmarks = await Bookmark.find({ })
            .populate("user", "fullname username image")
            .populate("articles", "title slug")
            .select("-__v")
            .lean();

        const data = bookmarks.map((bookmark) => ({
            ...bookmark,
            articlesCount: bookmark.articles?.length || 0
        }))

        return NextResponse.json({
            success: true,
            data
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Response Bookmark =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت بوکمارک ها",
            errors: err
        }, { status: 500 })
    }
};

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const body = await req.json();
        await bookmarkSchema.validate(body, { abortEarly: false });

        const { note, articles } = body;

        const existing = await Bookmark.findOne({
            user: user._id,
            note,
        });
        if (existing) {
            return NextResponse.json({
                success: false,
                message: "این عنوان قبلا انتخاب شده است"
            }, { status: 409 })
        };

        const data = await Bookmark.create({
            user: user._id,
            articles,
            note
        });

        return NextResponse.json({
            success: true,
            message: "لیست بوکمارک باموفقیت ساخته شد",
            data
        }, { status: 201 });

    } catch (err: any) {
        console.log("Error Crate Bookmark =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد لیست بوکمارک",
            errors: err
        }, { status: 500 })
    }
};