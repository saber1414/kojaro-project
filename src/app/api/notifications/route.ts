import ConnectedDB from "@/lib/db";
import { Notification } from "@/models/Index";
import { notificationSchema } from "@/validations/notificationSchema";
import { authenticate } from "@/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || !["admin", "author"].includes(admin.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر و نویسنده مجاز به ایجاد اعلان می باشند"
            }, { status: 401 })
        };

        const body = await req.json();

        const { title, description } = body;

        await notificationSchema.validate(body, { abortEarly: false });

        const existingNotification = await Notification.findOne({
            $or: [{ title }, { description }]
        });
        if (existingNotification) {
            return NextResponse.json({
                success: false,
                message: "عنوان یا توضیحات تکراری می باشد"
            }, { status: 409 })
        };

        const notification = await Notification.create({
            title,
            description,
            author: admin._id,
        });

        return NextResponse.json({
            success: true,
            message: "اعلان باموفقیت ارسال شد",
            data: notification
        }, { status: 201 })
    } catch (err: any) {
        console.log("Error Create Notification =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد اعلان",
            errors: err
        }, { status: 500 })
    }
};

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
        const skip = (page - 1) * limit;

        const query: any = {};

        const notifications = await Notification.find(query)
            .limit(limit)
            .populate("author", "fullname username image")
            .sort({ createdAt: -1 })
            .skip(skip)
            .select("-__v")
            .lean();

        return NextResponse.json({
            success: true,
            data: notifications
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Response Notifications =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت اعلان ها",
            error: err
        }, { status: 500 })
    }
};

export async function DELETE(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || !["admin", "author"].includes(admin.role)) {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر و نویسنده مجاز به حذف اعلان ها می باشند"
            }, { status: 401 })
        };

        const body = await req.json();

        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const validIds = ids.filter((id: string) => Types.ObjectId.isValid(id));
        if (validIds.length === 0) {
            return NextResponse.json({
                success: false,
                message: "شناسه معتبر نیست"
            }, { status: 400 })
        };

        const notifications = await Notification.find({
            _id: { $in: validIds }
        }).select("_id author coverImage");

        if (notifications.length === 0) {
            return NextResponse.json({
                success: false,
                message: "هیچ اعلانی یافت نشد"
            }, { status: 404 })
        };

        let notificationToDelete = notifications;

        if (admin.role === "author") {
            notificationToDelete = notifications.filter((notification) => notification.author.toString() === admin._id.toString());
            if (notificationToDelete.length === 0) {
                return NextResponse.json({
                    success: false,
                    message: "شما فقط می‌توانید مقالات خودتان را حذف کنید"
                }, { status: 403 })
            }
        };

        let idsToDelete = notifications.map((notification) => notification._id);

        const result = await Notification.deleteMany({
            _id: { $in: idsToDelete }
        });

        return NextResponse.json({
            success: true,
            message: `${result.deletedCount} اعلان باموفقیت حذف شد`,
            data: {
                deletedCount: result.deletedCount,
                deletedIds: idsToDelete,
            }
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Delete Notification =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف اعلان ها"
        }, { status: 500 })
    }
};