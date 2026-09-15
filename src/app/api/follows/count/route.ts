import ConnectedDB from "@/lib/db";
import { Follow } from "@/models/Index";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);
        const targetType = searchParams.get("targetType");
        const targetId = searchParams.get("targetId");

        if (!targetId || !targetType || !["author", "articleCategory"].includes(targetType) || !Types.ObjectId.isValid(targetId)) {
            return NextResponse.json({
                success: false,
                message: "پارامترها معتبر نیستند"
            }, { status: 400 })
        };

        const count = await Follow.countDocuments({ targetType, targetId });

        return NextResponse.json({
            success: true,
            data: { count }
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Feed Follow =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در شمارش ",
            errors: err
        }, { status: 500 })
    }
};