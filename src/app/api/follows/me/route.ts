import ConnectedDB from "@/lib/db";
import { Follow, User, ArticleCategory } from "@/models/Index";
import { authenticate } from "@/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";

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

        const qury: any = { user: user._id };

        if (targetType === "author" || targetType === "articleCategory") {
            qury.targetType = targetType;
        };

        const follows = await Follow.find(qury)
            .sort({ createdAt: -1 })
            .lean();

        const result = await Promise.all(
            follows.map(async (follow) => {
                let target = null;

                if (follow.targetType === "author") {
                    target = await User.findById(follow.targetId)
                        .select("username fullname image role bio")
                        .lean()
                } else {
                    target = await ArticleCategory.findById(follow.targetId)
                        .select("name slug")
                        .lean()
                };

                return {
                    _id: follow._id,
                    targetType: follow.tagetType,
                    targetId: follow.targetId,
                    target,
                    createdAt: follow.createdAt
                }
            })
        );

        return NextResponse.json({
            success: true,
            data: result
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Follows me =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در در دریافت دنبال شده ها",
            errors: err
        }, { status: 500 })
    }
};