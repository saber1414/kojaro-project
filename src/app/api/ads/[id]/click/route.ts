import ConnectedDB from "@/lib/db";
import { Advertisement } from "@/models/Index";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function POST(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await ConnectedDB();

        const { id } = await params;

        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "شناسه نامعتبر است" },
                { status: 400 }
            );
        };

        const ad = await Advertisement.findByIdAndUpdate(
            id,
            { $inc: { clickCount: 1 } },
            { new: true }
        ).select("link clickCount");

        if (!ad) {
            return NextResponse.json(
                { success: false, message: "تبلیغ یافت نشد" },
                { status: 404 }
            );
        };

        return NextResponse.json({
            success: true,
            data: {
                clickCount: ad.clickCount,
                link: ad.link
            }
        }, { status: 200 })
    } catch (err: any) {
        console.error("Ad click error =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ثبت کلیک"
        }, { status: 500 })
    }
}