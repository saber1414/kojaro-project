import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Ticket } from "@/models/Index";
import { updateTicketStatusSchema } from "@/validations/ticketSchema";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
            .populate("createdBy", "fullname username role image")
            .populate("assignedTo", "fullname username role image")
            .populate("closedBy", "fullname username")
            .populate("replies.sender", "fullname username role image")
            .lean()

        if (!ticket) {
            return NextResponse.json({
                success: false,
                message: "تیکت یافت نشد"
            }, { status: 404 })
        };

        if (user.role === "author" && ticket.createdBy !== user._id.toString()) {
            return NextResponse.json({
                success: false,
                message: "دستریی به این تیکت غیر مجاز می باشد"
            }, { status: 403 })
        };

        if (user.role === "author" && Array.isArray(ticket.replies)) {
            ticket.replies = ticket.replise.filter((replies: any) => !replies.isInternal)
        };

        return NextResponse.json({
            success: true,
            data: ticket
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Response =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت تیکت",
            error: err
        }, { status: 500 })
    }
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
                message: "احراز هویت نشده اید"
            }, { status: 401 })
        };

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return NextResponse.json({
                success: false,
                message: "تیکت یافت نشد"
            }, { status: 404 })
        };

        const body = await req.json();
        await updateTicketStatusSchema.validate(body, { abortEarly: false });

        const isOwner = ticket.createdBy === user._id.toString();
        const isAdmin = user.role === "admin";

        if (!isAdmin) {
            if (!isOwner) {
                return NextResponse.json({
                    success: false,
                    message: "دسترسی مجاز نیست"
                }, { status: 400 })
            }
            if (body.status && body.status !== "closed") {
                return NextResponse.json({
                    success: false,
                    message: "فقط نویسنده می تواند تیکت را ببیند"
                }, { status: 403 })
            }
        };

        if (body.status) {
            ticket.status = body.status;
            if (body.status === "closed") {
                ticket.closedAt = new Date();
                ticket.closedBy = user._id;
            }
        };

        if (isAdmin && body.priority) {
            ticket.priority = body.priority
        };

        if (isAdmin && body.assignedTo !== undefined) {
            ticket.assignedTo = body.assignedTo || null;
        };

        await ticket.save();

        const populate = await Ticket.findById(id)
            .populate("createdBy", "fullname username role image")
            .populate("assignedTo", "fullname username role image")
            .populate("closedBy", "fullname username")
            .select("-__v")
            .lean()

        return NextResponse.json({
            success: true,
            message: "تیکت باموفقیت ویرایش شد",
            data: populate
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Update Ticket =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ویرایش تیکت"
        }, { status: 500 })
    }
};