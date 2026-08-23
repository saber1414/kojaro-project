import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/middlewares/auth";
import { User } from "@/models/Index";
import ConnectedDB from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "احراز هویت نشده‌اید"
            }, { status: 200 });
        };

        const fullUser = await User.findById(user._id)
            .select("-password -__v")
            .lean()

        return NextResponse.json({
            success: true,
            data: fullUser
        });

    } catch (err: any) {
        console.error("Get user error:", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت اطلاعات کاربر"
        }, { status: 500 });
    }
};