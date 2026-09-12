import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Comment } from "@/models/Index";
import { CommentStatus } from "@/models/Comment";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { moderateCommentSchema } from "@/validations/commentSchema";

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

        const body = await req.json();

        await moderateCommentSchema.validate(body, { recursive: false });

        const comment = await Comment.findById(id);
        if (!comment || comment.isDeleted) {
            return NextResponse.json({
                success: false,
                message: "دیدگاه یافت نشد"
            }, { status: 404 })
        };

        const isAdmin = user.role === "admin";
        const isArticleAuthor = comment.author.toString() === user._id.toString();

        if (!isAdmin || !isArticleAuthor) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر یا نویسنده همین مقاله مجاز به تایید/رد دیدگاه هستند",
            }, { status: 400 })
        };

        const { status } = body;

        comment.status = status;

        if (status === CommentStatus.APPROVED) {
            comment.approvedBy = user._id;
            comment.apprivedAt = new Date();
            comment.rejectedBy = undefined;
            comment.rejectedAt = undefined;
        } else {
            comment.rejectedBy = user._id;
            comment.rejectedAt = new Date();
            comment.approvedBy = undefined;
            comment.apprivedAt = undefined;
        }

        await comment.save();

        const populated = await Comment.findById(id)
            .populate("author", "fullname username image")
            .populate("approvedBy", "fullname username image")
            .populate("rejectedBy", "fullname username image")
            .lean();

        return NextResponse.json({
            success: true,
            message: status === CommentStatus.APPROVED
                ? "دیدگاه تایید شد" :
                status === CommentStatus.SPAM ?
                    "دیدگاه به عنوان اسپم علامت‌گذاری شد"
                    : "دیدگاه رد شد",
            data: populated
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Comment Status =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در تایید | رد دیدگاه"
        }, { status: 500 })
    }
}