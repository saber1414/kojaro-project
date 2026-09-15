import ConnectedDB from "@/lib/db";
import { Follow, User, ArticleCategory } from "@/models/Index";
import { authenticate } from "@/middlewares/auth";
import { followSchema } from "@/validations/followSchema";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "لطفا وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const body = await req.json();
        const { targetId, targetType } = body;

        await followSchema.validate(body, { abortEarly: false });

        if (!Types.ObjectId.isValid(targetId)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        if (targetType === "author" && targetId === user._id.toString()) {
            return NextResponse.json({
                success: false,
                message: "نمی توانید خودتان را دنبال کنید"
            }, { status: 400 })
        };

        if (targetType === "author") {
            const auhtor = await User.findById(targetId).select("_id");
            if (!auhtor) {
                return NextResponse.json({
                    success: false,
                    message: "نویسنده یافت نشد"
                }, { status: 404 })
            }
        } else {
            const category = await ArticleCategory.findById(targetId).select("_id");
            if (!category) {
                return NextResponse.json({
                    success: false,
                    message: "دسته بندی یافت نشد"
                }, { status: 404 })
            }
        };

        const existing = await Follow.findOne({
            user: user._id,
            targetType,
            targetId
        });
        if (existing) {
            return NextResponse.json({
                success: false,
                message: "قبلا این مورد را دنبال کرده اید"
            }, { status: 409 })
        };

        const follow = await Follow.create({
            user: user._id,
            targetType,
            targetId
        });

        return NextResponse.json({
            success: true,
            message: targetType === "author" ? "نویسنده دنبال شد" : "دسته بندی دنبال شد",
            data: follow
        }, { status: 201 })

    } catch (err: any) {
        console.log("Error Follow =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دنبال کردن"
        }, { status: 500 })
    }
};

export async function DELETE(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "لطفا وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const body = await req.json();
        await followSchema.validate(body, { abortEarly: false });
        
        const { targetId, targetType } = body;


        const unfollow = await Follow.findOneAndDelete({
            user: user._id,
            targetType,
            targetId,
        });

        if (!unfollow) {
            return NextResponse.json({
                success: false,
                message: "این مورد را نبال نکرده اید"
            }, { status: 404 })
        };

        return NextResponse.json({
            success: true,
            message: "آنفاو انجام شد",
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error unfollow =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در آنفالو"
        }, { status: 500 })
    }
};