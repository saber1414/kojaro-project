import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { User } from "@/models/Index";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises"

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به دریافت لیست کاربران می باشد"
            }, { status: 400 })
        };

        const { searchParams } = new URL(req.url);

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(100, parseInt(searchParams.get("limit") || "100"));
        const skip = (page - 1) * limit;

        const search = searchParams.get("search")?.trim() || "";
        const role = searchParams.get("role")?.trim() || "";
        const isVerified = searchParams.get("isVerified") || "";

        const query: any = {};

        if (search) {
            query.$or = [
                { fullname: { $regex: search, $options: "i" } },
                { username: { $regex: search, $options: "1" } },
                { username: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        };

        if (role && ["user", "admin", "moderator", "author"].includes(role)) {
            query.role = role
        };
        if (isVerified === 'true') query.isVerified = true;
        if (isVerified === 'false') query.isVerified = false;

        const total = await User.countDocuments(query);

        const users = await User.find(query)
            .limit(limit)
            .sort({ createdAt: -1 })
            .skip(skip)
            .select("-password -__v")
            .lean();

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            success: true,
            data: {
                users,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            }
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت لیست کاربران"
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
                message: "فقط مدیر مجاز به حذف کاربران می باشد"
            }, { status: 401 })
        };

        const body = await req.json();

        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({
                success: false,
                message: "لیست شناسه کاربران الزامی می باشد"
            }, { status: 400 })
        };

        const validIds = ids.filter((id: string) => Types.ObjectId.isValid(id));
        if (validIds.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "هیچ شناسه معتبری ارسال نشده است",
                },
                { status: 400 }
            );
        };

        const adminId = admin._id.toString();
        if (validIds.includes(adminId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "نمی‌توانید حساب خودتان را حذف کنید",
                },
                { status: 400 }
            );
        };

        const adminsToDelete = await User.countDocuments({
            _id: { $in: ids },
            role: "admin",
        });

        if (adminsToDelete > 0) {
            const totalAdmins = await User.countDocuments({ role: "admin" });
            if (totalAdmins - adminsToDelete < 1) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "نمی‌توانید تمام مدیران سیستم را حذف کنید",
                    },
                    { status: 400 }
                );
            }
        };

        const usersToDelete = await User.find({
            _id: { $in: validIds },
        }).select("image");

        for (const user of usersToDelete) {
            if (user.image && user.image.startsWith("/uploads/")) {
                const imagePath = path.join(process.cwd(), "public", user.image);
                await fs.unlink(imagePath).catch(() => { });
            }
        }

        const result = await User.deleteMany({
            _id: { $in: validIds },
        });

        return NextResponse.json(
            {
                success: true,
                message: `${result.deletedCount} کاربر با موفقیت حذف شد`,
                data: {
                    deletedCount: result.deletedCount,
                },
            },
            { status: 200 }
        );

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در حذف کاربران"
        }, { status: 500 })
    }
};