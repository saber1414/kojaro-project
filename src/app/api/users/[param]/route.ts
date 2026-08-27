import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { User } from "@/models/Index";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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
