import ConnectedDB from "@/lib/db";
import { Follow} from "@/models/Index";
import { authenticate } from "@/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "لطفا وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const { searchParams } = new URL(req.url);
        const targetType = searchParams.get("targetType");
        const targetId = searchParams.get("targetId");

        if (!targetId || !targetType || !["author", "articleCategory"].includes(targetType) || !Types.ObjectId.isValid(targetId)) {
            return NextResponse.json({
                success: false,
                message: "پارامترها معتبر نیستند"
            }, { status: 400 })
        };

        const exists = Follow.exists({
            user: user._id,
            targetType,
            targetId
        });

        return NextResponse.json({
            success: true,
            data: { isFollow: Boolean(exists) }
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Check Follow =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در بررسی وضعیت"
        }, { status: 500 })
    }
}