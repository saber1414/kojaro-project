import ConnectedDB from "@/lib/db";
import { Ticket } from "@/models/Index";
import { authenticate } from "@/middlewares/auth";
import { createTicketSchema } from "@/validations/ticketSchema";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user || !["admin", "author"].includes(user.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر و نویسنده مجاز به ارسال تیکت می باشند"
            }, { status: 401 })
        };

        const body = await req.json();

        const { subject, message, priority, category } = body;

        await createTicketSchema.validate(body, { abortEarly: false })

        const ticket = await Ticket.create({
            subject: subject.trim(),
            message: message.trim(),
            priority: priority || "medium",
            category: category || "other",
            createdBy: user._id,
            status: "open"
        });

        const populate = await Ticket.findById(ticket._id)
            .populate("createdBy", "fullname username image role")
            .lean();

        return NextResponse.json({
            success: true,
            message: "تیکت باموفقیت ایجاد شد",
            data: populate
        }, { status: 201 })

    } catch (err: any) {
        console.log('Err Create Ticket =>', err);
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد تیکت",
            error: err
        }, { status: 500 })
    }
};

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user || !["admin", "aithor"].includes(user?.role)) {
            return NextResponse.json({
                success: false,
                message: "دسترسی مجاز نیست"
            }, { status: 401 })
        };

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const limit = Math.min(50, Math.max(10, parseInt(searchParams.get("limit") || "10", 10)));
        const skip = (page - 1) * limit;

        const status = searchParams.get("status");
        const priority = searchParams.get("priority");
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        const query: any = {};

        if (user.role === "author") query.createdBy = user._id;
        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (category) query.category = category;
        if (search?.trim()) {
            query.$or = [
                { subject: { $regex: search.trim(), $options: "i" } },
                { message: { $regex: search.trim(), $options: "i" } }
            ]
        };

        const [tickets, total] = await Promise.all([
            Ticket.find(query)
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1, lastReplyAt: -1 })
                .populate("createdBy", "fullname username image role")
                .populate("assignedTo", "fullname username image role")
                .select("-__v")
                .lean(),
            Ticket.countDocuments(query)
        ]);

        return NextResponse.json({
            success: true,
            data: {
                tickets,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit) || 1,
                    hasNextPage: page * limit < total,
                    hasPrevPage: page > 1
                }
            }
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Respone Tickets =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت تیکت ها",
            error: err
        }, { status: 500 })
    }
};

export async function DELETE(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "دسترسی مجاز نیست"
            }, { status: 401 })
        };

        const body = await req.json();

        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({
                success: false,
                message: "حداقل یک شناسه انتخاب کنید"
            }, { status: 400 })
        };

        const isObjectId = ids.filter((id) => Types.ObjectId.isValid(id));
        if (isObjectId.length === 0) {
            return NextResponse.json({
                success: false,
                message: "شناسه‌های ارسال‌شده معتبر نیستند"
            }, { status: 400 })
        };

        const tickets = await Ticket.find({
            _id: { $in: isObjectId }
        }).select("_id");

        if (tickets.length === 0) {
            return NextResponse.json({
                success: false,
                message: "هیج تیکتی یافت نشد"
            }, { status: 404 })
        };

        const idsToDelete = tickets.map((ticket) => ticket._id);

        const result = await Ticket.deleteMany({
            _id: { $in: idsToDelete }
        });

        return NextResponse.json({
            success: true,
            message: `${result.deletedCount} تیکت باموفقیت حذف شد`,
            data: {
                deletedCount: result.deletedCount,
                deletedIds: idsToDelete
            }
        }, { status: 200 })
    } catch (err: any) {
        console.log("Error Deleted Tickets =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف تیکت ها",
            error: err
        }, { status: 500 })
    }
};