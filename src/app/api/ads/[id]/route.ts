import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Advertisement } from "@/models/Index";
import { updatedAdSchema } from "@/validations/advertisementSchema";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await ConnectedDB();

        const { id } = await params;

        if (!isObjectId(id)) {
            return NextResponse.json({
                success: false,
                message: "شناسه نامعتبر است"
            }, { status: 400 })
        };

        const ad = await Advertisement.findById(id)
            .select("-__v")
            .lean();

        if (!ad) {
            return NextResponse.json({
                success: false,
                message: "تبلیغ یافت نشد"
            }, { status: 404 })
        };

        return NextResponse.json({
            success: true,
            data: ad
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت تبلیغ"
        }, { status: 500 })
    }
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به ویرایش تبلیغ می باشد"
            }, { status: 401 })
        };

        const { id } = await params;

        if (!isObjectId(id)) {
            return NextResponse.json({
                success: false,
                message: "شناسه نامعتبر است"
            }, { status: 400 })
        };

        const ad = await Advertisement.findById(id);
        if (!ad) {
            return NextResponse.json({
                success: false,
                message: "تبلیغ یافت نشد"
            }, { status: 404 })
        };

        const formData = await req.formData();
        const updatedData: any = {};

        const title = formData.get("title") as string | null;
        const link = formData.get("link") as string | null;
        const image = formData.get("image") as File | null;
        const alt = formData.get("alt") as string | null;
        const advertiserName = formData.get("advertiserName") as string | null;
        const startDateRow = formData.get("startDate") as string | null;
        const endDateRow = formData.get("endDate") as string | null;
        const isActiveRow = formData.get("isActive");
        const orderRow = formData.get("order");
        const position = (formData.get("position") as string) || "home";
        const removeImage = formData.get("removeImage") === "true";

        if (title) updatedData.title = title || null;
        if (link) updatedData.link = link.trim();
        if (alt !== null) updatedData.alt = alt.trim() || null;
        if (advertiserName !== null) updatedData.advertiserName = advertiserName.trim() || null;
        if (startDateRow) updatedData.startDate = new Date(startDateRow);
        if (endDateRow) updatedData.endDate = new Date(endDateRow);
        if (position) updatedData.position = position
        if (isActiveRow !== null && isActiveRow !== undefined) {
            const value = String(isActiveRow).toLowerCase().trim();
            if (value === "false" || value === "0") {
                updatedData.isActive = false;
            };
            if (value === "true" || value === "1") {
                updatedData.isActive = true;
            };
        };
        if (orderRow !== null && orderRow !== "") {
            const order = parseInt(String(orderRow), 10);
            if (!isNaN(order)) updatedData.order = order;
        };
        if (removeImage) {
            if (ad.image) {
                const oldPath = path.join(process.cwd(), "public", ad.image);
                await fs.unlink(oldPath).catch((err: any) => { console.log("Error Remove Image =>", err) })
            }
        };

        if (image && image.size > 0) {
            const allowedTypes = ["image/png", "image/webp", "image/jpg", "image/jpeg", "image/svg+xml", "image/gif"];
            if (!allowedTypes.includes(image.type)) {
                return NextResponse.json({
                    success: false,
                    message: "فرمت تصویر معتبر نیست"
                }, { status: 422 })
            };
            if (image.size > 5 * 1024 * 1024) {
                return NextResponse.json({
                    success: false,
                    message: "حداکثر مجاز 5 مگابایت"
                }, { status: 422 })
            };

            if (ad.image) {
                const oldPath = path.join(process.cwd(), "public", ad.image);
                await fs.unlink(oldPath).catch((err: any) => { console.log("Error Remove Image =>", err) })
            };

            const ext = path.extname(image.name);
            const filename = `ad__${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPatch = path.join(uploadDir, filename);

            await fs.writeFile(fullPatch, Buffer.from(await image.arrayBuffer()));

            updatedData.image = `/uploads/${filename}`
        };

        await updatedAdSchema.validate({
            title: updatedData.title ?? ad.title,
            link: updatedData.link ?? ad.link,
            startDate: updatedData.startDate ?? ad.startDate,
            endDate: updatedData.endDate ?? ad.endDate,
        }, { recursive: true });

        const updated = await Advertisement.findByIdAndUpdate(id, updatedData, { new: true }).select("-__v").lean();

        return NextResponse.json({
            success: true,
            message: "تبلیغ با موفقیت ویرایش شد",
            data: updated
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Edit Ads =>", err)
        return NextResponse.json({
            success: false,
            message: "خطا در ویرایش تبلیغ"
        }, { status: 500 })
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به ویرایش تبلیغ می باشد"
            }, { status: 401 })
        };

        const { id } = await params;

        if (!isObjectId(id)) {
            return NextResponse.json({
                success: false,
                message: "شناسه نامعتبر است"
            }, { status: 400 })
        };

        const ad = await Advertisement.findById(id);
        if (!ad) {
            return NextResponse.json({
                success: false,
                message: "تبلیغ یافت نشد"
            }, { status: 404 })
        };

        if (ad.image) {
            const relativePath = ad.image.replace(/^\/+/, "");
            const oldPath = path.join(process.cwd(), "public", relativePath);
            await fs.unlink(oldPath)
        };

        await Advertisement.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "تبلیغ باموفقیت حذف شد"
        }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در حذف تبلیغ"
        }, { status: 500 })
    }
};