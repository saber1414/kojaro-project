import ConnectedDB from "@/lib/db";
import { Ticket } from "@/models/Index";
import { replyTicketSchema } from "@/validations/ticketSchema";
import { authenticate } from "@/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await ConnectedDB();

        const { id } = await params;

        if (!isObjectId(id)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const user = await authenticate(req);
        if (!user || !["admin", "author"].includes(user.role)) {
            return NextResponse.json({
                success: false,
                message: "دسترسی مجاز نیست"
            }, { status: 401 })
        };

        const ticket = await Ticket.findById(id)
        if (!ticket) {
            return NextResponse.json({
                success: false,
                message: "تیکیت یافت نشد"
            }, { status: 404 })
        };

        const isOwner = ticket.createdBy.toString() === user._id.toString();
        const isAdmin = user.role === "admin";

        if (!isAdmin && !isOwner) {
            return NextResponse.json({
                success: false,
                message: "دسترسی به این تیکت مجاز نیست"
            }, { status: 400 })
        };

        const body = await req.json();
        await replyTicketSchema.validate(body, { abortEarly: false });

        const { message, isInternal } = body;

        const internal = isAdmin ? Boolean(isInternal) : false;

        ticket.replies.push({
            sender: user._id,
            message: message.trim(),
            isInternal: internal,
            createdAt: new Date()
        });

        ticket.lastReplyAt = new Date();

        if (!internal) {
            if (isAdmin) {
                ticket.status = "answered"
            } else if (ticket.status === "answered") {
                ticket.status === "open"
            }
        };

        await ticket.save();

        const populated = await Ticket.findById(id)
            .populate("createdBy", "fullname username role image")
            .populate("assignedTo", "fullname username role image")
            .populate("replies.sender", "fullname username role image")
            .lean();

        if (user.role === "author" && populated?.replies) {
            populated.replies = populated.replies.filter((replise: any) => !replise.isInternal)
        }

        return NextResponse.json({
            success: true,
            message: "پاسخ ثبت شد",
            data: populated
        }, { status: 200 })
    } catch (err: any) {
        console.log("Error Reply Ticket =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ارسال پاسخ",
            error: err
        }, { status: 500 })
    }
};