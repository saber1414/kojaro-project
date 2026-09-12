import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Comment } from "@/models/Index";
import { ReactionType } from "@/models/Comment";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { reactionSchema } from "@/validations/commentSchema";

const isValidObject = (value: string) => Types.ObjectId.isValid(value);

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await ConnectedDB();

        const { id } = await params;

        if (!isValidObject(id)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "وارد حساب خود شوید"
            }, { status: 401 })
        };

        const body = await req.json();
        const { type } = body as { type: ReactionType };

        await reactionSchema.validate(body, { recursive: false });

        const comment = await Comment.findById(id);
        if (!comment || comment.isDeleted) {
            return NextResponse.json({
                success: false,
                message: "دیدگاه یافت نشد"
            }, { status: 404 })
        };

        const userId = user._id.toString();
        const existingIndex = comment.reactions.findIndex((reaction: any) => reaction.userId.toString() === userId);

        if (existingIndex !== -1) {
            const oldType = comment.reactions[existingIndex].type;

            comment.reactions.splice(existingIndex, 1);

            if (comment.reactionCounts[oldType] > 0) {
                comment.reactionCounts[oldType] -= 1;
            }

            if (oldType !== type) {
                comment.reactions.push({
                    type,
                    userId: user._id,
                    createdAt: new Date(),
                });
                comment.reactionCounts[type] =
                    (comment.reactionCounts[type] || 0) + 1;
            }
        } else {
            comment.reactions.push({
                type,
                userId: user._id,
                createdAt: new Date(),
            });
            comment.reactionCounts[type] =
                (comment.reactionCounts[type] || 0) + 1;
        };

        await comment.save();

        return NextResponse.json({
            success: true,
            message: "واکنش ثبت شد",
            data: {
                reactionCounts: comment.reactionCounts,
                reactions: comment.reactions,
            },
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Comment Reaction =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در واکنش به دیدگاه"
        }, { status: 500 })
    }
}