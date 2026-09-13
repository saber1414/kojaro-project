import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Article, Comment } from "@/models/Index";
import { createCommentSchema } from "@/validations/commentSchema";
import { CommentStatus, CommentType } from "@/models/Comment";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || !["admin", "author"].includes(admin.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به دریافت همه دیدگاه ها می باشد"
            }, { status: 401 })
        };

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "10")));
        const skip = (page - 1) * limit;

        const status = searchParams.get("status");
        const articleId = searchParams.get("articleId")?.trim() || "";
        const authorId = searchParams.get("authorId") || "";
        const search = searchParams.get("search")?.trim() || "";
        const includeDeleted = searchParams.get("includeDeleted") === "true";
        const onlyRoot = searchParams.get("onlyRoot") === "true";
        const sortBy = searchParams.get("sort") || "newest";
        const user = searchParams.get("user")?.trim() || "";

        const query: any = {};

        if (admin.role === "author") {
            query.$or = [{ author: admin._id }]
        };

        if (includeDeleted) query.includeDeleted = includeDeleted;
        if (status && Object.values(CommentStatus).includes(status as CommentStatus)) query.status = status;
        if (search) query.$text = { $search: search };
        if (user && Types.ObjectId.isValid(admin._id)) query.user = user;
        if (articleId && Types.ObjectId.isValid(articleId)) query.articleId = articleId;
        if (authorId && Types.ObjectId.isValid(authorId)) query.authorId = authorId;
        if (onlyRoot) query.parentComment = null;

        const sortOption = sortBy === "oldest" ? { createdAt: 1 as const } : { createdAt: -1 as const };

        const [comments, total] = await Promise.all([
            Comment.find(query)
                .limit(limit)
                .skip(skip)
                .sort(sortOption)
                .populate("author", "fullname username image")
                .populate("parentComment", "content author")
                .populate("article", "title slug")
                .populate("approvedBy", "fullname username")
                .populate("rejectedBy", "fullname username")
                .select("-__v")
                .lean(),

            Comment.countDocuments(query)
        ]);

        return NextResponse.json({
            success: true,
            data: {
                comments,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                    hasPrevPages: page * limit < total,
                    hasNextPages: page > 1
                }
            }
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Comment =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت دیدگاه ها",
            errors: err
        }, { status: 500 })
    }
};

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "لطفا وارد حساب کاربری شوید"
            }, { status: 401 })
        };

        const body = await req.json();

        await createCommentSchema.validate(body, { abortEarly: false });

        const {
            content,
            articleId,
            parentCommentId,
            type = CommentType.COMMENT,
            isSpoiler = false,
            userMentions = [],
            attachments = [],
        } = body;

        if (!Types.ObjectId.isValid(articleId)) {
            return NextResponse.json(
                { success: false, message: "شناسه مقاله نامعتبر است" },
                { status: 400 }
            );
        };

        const article = await Article.findById(articleId).select("_id author status");
        if (!article) {
            return NextResponse.json({
                success: false,
                message: "مقاله یافت نشد"
            }, { status: 404 })
        };

        let parentComment = null;

        if (parentCommentId) {
            if (!Types.ObjectId.isValid(parentCommentId)) {
                return NextResponse.json(
                    { success: false, message: "شناسه دیدگاه والد نامعتبر است" },
                    { status: 400 }
                );
            };

            parentComment = await Comment.findById(parentCommentId);
            if (!parentComment || parentComment.isDeleted) {
                return NextResponse.json(
                    { success: false, message: "دیدگاه والد یافت نشد" },
                    { status: 404 }
                );
            };

            if (parentComment.article.toString() !== articleId) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "دیدگاه والد مربوط به این مقاله نیست",
                    },
                    { status: 400 }
                );
            };
        }

        const isAuthor = article.author?.toString() === user._id.toString();
        const isAdmin = user.role === "admin";
        const autoApprove = isAdmin || isAuthor;

        const comment = await Comment.create({
            content: content.trim(),
            type,
            isSpoiler: Boolean(isSpoiler),
            status: autoApprove
                ? CommentStatus.APPROVED
                : CommentStatus.PENDING,
            author: user._id,
            article: articleId,
            parentComment: parentCommentId || null,
            userMentions,
            attachments,
            approvedBy: autoApprove ? user._id : null,
            approvedAt: autoApprove ? new Date() : null,
        });

        if (parentComment) {
            parentComment.replies.push(comment._id);
            await parentComment.save()
        };

        const populated = await Comment.findById(comment._id)
            .populate("author", "fullname username image role")
            .populate("userMentions", "fullname username image")
            .lean();

        return NextResponse.json({
            success: true,
            message: autoApprove ? "دیدگاه تایید شد" : "دیدگاه پس از تایید نمایش داده می شود",
            data: populated
        }, { status: 201 })

    } catch (err: any) {
        console.log("Error Create Comment =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد دیدگاه",
            errors: err
        }, { status: 500 })
    }
};