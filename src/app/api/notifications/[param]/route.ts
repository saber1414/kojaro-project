import ConnectedDB from "@/lib/db";
import { Notification } from "@/models/Index";
import { updatedNotificationSchema } from "@/validations/notificationSchema";
import { authenticate } from "@/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(_: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const notification = await Notification.findById(param)
            .populate("author", "fullname username image")
            .select("-__v")
            .lean();

        if (!notification) {
            return NextResponse.json({
                success: false,
                message: "اعلان یافت نشد"
            }, { status: 404 })
        };

        return NextResponse.json({
            success: true,
            data: notification
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت اعلان",
            error: err
        }, { status: 500 })
    }
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || !["admin", "author"].includes(admin.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر و نویسنده مجاز به ایجاد اعلان می باشند"
            }, { status: 401 })
        };

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const notification = await Notification.findById(param);
        if (!notification) {
            return NextResponse.json({
                success: false,
                message: "اعلان یافت نشد"
            }, { status: 404 })
        };

        const body = await req.json();
        const query: any = {};

        const { title, description } = body;

        if (title) query.title = title.trim();
        if (description) query.description = description.trim();

        try {
            await updatedNotificationSchema.validate({
                title: query.title ?? notification.title,
                description: query.description ?? notification.description
            }, { abortEarly: false })
        } catch (err: any) {
            return NextResponse.json(
                {
                    success: false,
                    message: "اطلاعات وارد شده معتبر نیست",
                    errors: err.errors,
                },
                { status: 400 }
            );
        };

        const updated = await Notification.findByIdAndUpdate(param, query, { new: true });

        return NextResponse.json({
            success: true,
            message: "اعلان باموفقیت ویرایش شد",
            data: updated
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Edit Notification")
    }
};