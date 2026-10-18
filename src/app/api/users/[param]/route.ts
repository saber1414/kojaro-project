import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { User } from "@/models/Index";
import fs from "fs/promises";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

let isObjectId = (value: string) => Types.ObjectId.isValid(value)

export async function GET(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به دریافت اطلاعات یک کاربر می باشد"
            })
        };

        const { param } = await params;
        let user;

        if (isObjectId(param)) {
            user = await User.findById(param)
                .select("-password -__v")
                .lean()
        };

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "کاربر یافت نشد"
            }, { status: 404 })
        };

        return NextResponse.json({
            success: true,
            data: user
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت اطلاعات کاربر"
        }, { status: 500 })
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به حذف کاربر می باشد"
            }, { status: 401 })
        };

        const { param } = await params

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const user = await User.findById(param);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "کاربر یافت نشد"
            }, { status: 404 })
        };

        if (user.image) {
            const oldPath = path.join(process.cwd(), "public", user.image);
            await fs.unlink(oldPath)
        };

        await User.findByIdAndDelete(param)

        return NextResponse.json({
            success: true,
            message: "کاربر باموفقیت حذف شد"
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Delete User =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف کاربر",
            error: err
        }, { status: 500 })
    }
};