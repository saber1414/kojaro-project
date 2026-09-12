import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Article, Comment } from "@/models/Index";
import { updateCommentSchema } from "@/validations/commentSchema";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isValidObject = (value: string) => Types.ObjectId.isValid(value);

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

        const comment = await Comment.findById(id);
        if (!comment || comment.isDeleted) {
            return NextResponse.json({
                success: false,
                message: "دیدگاه یافت نشد"
            }, { status: 404 })
        };

        const isOwner = comment.author.toString() === user._id.toString();
        const isAdmin = user.role === "admin";

        if (!isOwner || !isAdmin) {
            return NextResponse.json({
                success: false,
                message: "مجاز به ویرایش نیستید"
            }, { status: 403 })
        };

        const body = await req.json();

        const { isSpoiler, userMentions, content, attachments } = body;

        await updateCommentSchema.validate(body, { abortEarly: false });

        if (isSpoiler !== undefined) comment.isSpoiler = isSpoiler;
        if (userMentions !== undefined) comment.userMentions = userMentions;
        if (attachments !== undefined) comment.attachments = attachments;
        if (content !== undefined) {
            comment.content = content.trim(),
                comment.isEdited = true,
                comment.editedAt = new Date()
        };

        await comment.save();

        const populated = await Comment.findById(id)
            .populate("author", "fullname username image role")
            .lean();

        return NextResponse.json({
            success: true,
            message: "دیدگاه باموفقیت ویرایش شد",
            data: populated
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Edit Comment =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ویرایش دیدگاه"
        }, { status: 500 })
    }
};

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await ConnectedDB();

        const { id } = await params;
        if (!isValidObject(id)) {
            return NextResponse.json(
                { success: false, message: "شناسه معتبر نیست" },
                { status: 400 }
            );
        };

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "احراز هویت نشده‌اید" },
                { status: 401 }
            );
        };

        const comment = await Comment.findById(id);
        if (!comment || comment.isDeleted) {
            return NextResponse.json(
                { success: false, message: "دیدگاه یافت نشد" },
                { status: 404 }
            );
        };

        const article = await Article.findById(comment.article).select("author");

        const isOwner = comment.author.toString() === user._id.toString();
        const isAdmin = user.role === "admin";
        const isArticleAuthor =
            article && article.author?.toString() === user._id.toString();

        if (!isOwner && !isAdmin && !isArticleAuthor) {
            return NextResponse.json(
                { success: false, message: "مجاز به حذف نیستید" },
                { status: 403 }
            );
        };

        comment.isDeleted = true;
        await comment.save();

        if (comment.parentComment) {
            await Comment.findByIdAndUpdate(comment.parentComment, {
                $pull: { replies: comment._id },
            });
        };

        return NextResponse.json(
            {
                success: true,
                message: "دیدگاه با موفقیت حذف شد",
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.log("Error Delete Comment =>", err);
        return NextResponse.json(
            {
                success: false,
                message: "خطا در حذف دیدگاه",
            },
            { status: 500 }
        );
    }
}