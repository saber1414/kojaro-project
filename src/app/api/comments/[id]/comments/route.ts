import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Article, Comment } from "@/models/Index";
import { CommentStatus } from "@/models/Comment";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isValidObject = (value: string) => Types.ObjectId.isValid(value);

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await ConnectedDB();

        const { id } = await params;

        if (!isValidObject(id)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const article = await Article.findById(id).select("_id author");
        if (!article) {
            return NextResponse.json({
                success: false,
                message: "مقاله یافت نشد"
            }, { status: 404 })
        };

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("page") || "20")));
        const skip = (page - 1) * limit;

        const user = await authenticate(req);

        const isAdmin = user?.role === "admin";
        const isAuthor = user && article.author.toString() === user._id.toString();

        const statusFilter = isAdmin || isAuthor ? { $in: [CommentStatus.APPROVED, CommentStatus.PENDING] } : CommentStatus.APPROVED;

        const filter: any = {
            article: id,
            parentComment: null,
            status: statusFilter
        };

        const [comments, total] = await Promise.all([
            Comment.find(filter)
                .sort({ isPinned: -1, createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .select("-__v")
                .populate("author", 'fullname username image')
                .populate("userMentions", 'fullname username image')
                .lean(),

            Comment.countDocuments(filter)
        ]);

        const commentIds = comments.map((comment) => comment._id);
        const replies = await Comment.find({
            parentComment: { $in: commentIds },
            isDeleted: false,
            status: statusFilter
        })
            .sort({ created: 1 })
            .populate("author", "fullname username image")
            .lean();

        const repliesMap = new Map<string, any[]>();

        for (const reply of replies) {
            const key = reply.parentComment.toString();
            if (!key) continue;
            if (!repliesMap.has(key)) repliesMap.set(key, []);

            repliesMap.get(key)!.push(reply)
        };

        const tree = comments.map((comment) => ({
            ...comment,
            replies: repliesMap.get(comment._id.toString()) || []
        }));

        return NextResponse.json({
            success: true,
            data: {
                comments: tree,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                    hasPrevPage: page * limit < total,
                    hasNextPage: page > 1
                }
            }
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Comment =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت دیدگاه"
        }, { status: 500 })
    }
};