import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Article, ArticleReaction } from "@/models/Index";
import { articleReactionSchema, articleReactionWithArticleSchema } from "@/validations/articleReactionSchema";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const article = await Article.findById(param)
            .select("likeCount dislikeCount")
            .lean();

        if (!article) {
            return NextResponse.json({
                success: false,
                message: "مقاله یافت نشد"
            }, { status: 404 })
        };

        let userReaction: "like" | "dislike" | null = null;

        const user = await authenticate(req);
        if (user) {
            const reaction = await ArticleReaction.findOne({
                user: user._id,
                article: param
            }).select("type").lean();

            userReaction = reaction?.type ?? null;
        };

        return NextResponse.json({
            success: true,
            data: {
                userReaction,
                likeCount: article?.likeCount ?? 0,
                dislike: article?.discount ?? 0
            }
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Reaction Response =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت واکنش"
        }, { status: 500 })
    }
};

export async function POST(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const body = await req.json();

        const { type } = body as { type: "like" | "dislike" };

        const article = await Article.findById(param)
            .select("likeCount dislikeCount");

        if (!article) {
            return NextResponse.json({
                success: false,
                message: "مقاله یافت نشد"
            }, { status: 404 })
        };

        let userReaction: "like" | "dislike" | null = null;

        const existing = await ArticleReaction.findOne({
            user: user._id,
            article: param
        });
        if (!existing) {
            await ArticleReaction.create({
                user: user._id,
                article: param,
                type
            });

            if (type === "like") {
                article.likeCount = (article.likeCount || 0) + 1;
            } else {
                article.dislikeCount = (article.dislikeCount || 0) + 1
            };

            await article.save();

            userReaction = type;
        } else if (existing.type === type) {
            await ArticleReaction.findByIdAndDelete(existing._id);

            if (type === "like") {
                article.likeCount = Math.max(0, (article.likeCount || 0) - 1);
            } else {
                article.dislikeCount = Math.max(0, (article.dislikeCount || 0) - 1);
            };

            await article.save();
            userReaction = null;
        } else {
            const oldType = existing.type;
            existing.type = type;

            await existing.save();

            if (oldType === "like") {
                article.likeCount = Math.max(0, (article.likeCount || 0) - 1);
                article.dislikeCount = (article.dislikeCount || 0) + 1;
            } else {
                article.dislikeCount = Math.max(0, (article.dislikeCount || 0) - 1);
                article.likeCount = (article.likeCount || 0) + 1
            }

            await article.save();
            userReaction = type;
        };

        return NextResponse.json({
            success: true,
            data: {
                userReaction,
                likeCount: article.likeCount ?? 0,
                dislikeCount: article.discount ?? 0
            }
        }, { status: 200 })
    } catch (err: any) {
        console.log("Error Reaction =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ارسال واکنش"
        }, { status: 500 })
    }
};