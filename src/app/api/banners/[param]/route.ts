import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Banner } from "@/models/Index";
import { updateBannerShcema } from "@/validations/bannerSchema";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function PUT(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به ویرایش بنر می باشد"
            }, { status: 401 })
        };

        const { param } = await params;
        if (!isObjectId(param)) {
            return NextResponse.json({
                succcess: false,
                message: "برای ویرایش از id استفاده کنید"
            }, { status: 400 })
        };

        const banner = await Banner.findById(param);
        if (!banner) {
            return NextResponse.json({
                success: false,
                message: "بنر یافت نشد"
            }, { status: 404 })
        };

        const formData = await req.formData();

        let updated: any = {};

        const title = formData.get("title") as string | null;
        const link = formData.get("link") as string | null;
        const image = formData.get('image') as File | null;
        const removeImage = formData.get("removeImage") === "true";

        if (title) updated.title = title.trim();
        if (link) updated.link = link.trim();
        if (removeImage) {
            if (banner.image) {
                const oldPath = path.join(process.cwd(), "public", banner.image);
                await fs.unlink(oldPath).catch(() => { })
            }
        };

        if (image && image.size > 0) {
            const allowedTypes = ["image/png", "image/jpg", "image/webp", "image/jpeg"];
            if (!allowedTypes.includes(image.type)) {
                return NextResponse.json({
                    suucess: false,
                    message: "فرمت انتخابی شما معتبر نیست"
                }, { status: 422 })
            };
            if (image.size > 5 * 1024 * 1024) {
                return NextResponse.json({
                    success: false,
                    message: "حداکثر مجاز 5 مگابایت"
                }, { status: 422 })
            };

            if (banner.image) {
                const oldPath = path.join(process.cwd(), "public", banner.image);
                await fs.unlink(oldPath).catch(() => { })
            };

            const ext = path.extname(image.name);
            const filename = `banner__${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "banners");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPatch = path.join(uploadDir, filename);

            await fs.writeFile(fullPatch, Buffer.from(await image.arrayBuffer()));

            updated.image = `/uploads/${filename}`
        };

        await updateBannerShcema.validate({
            title: updated.title ?? title,
            link: updated.link ?? link
        }, { abortEarly: false });

        const updateBanner = await Banner.findByIdAndUpdate(param, updated, { new: true }).lean();


        return NextResponse.json({
            success: true,
            message: "بنر باموفقیت ویرایش شد",
            data: updateBanner
        }, { status: 200 })
    } catch (err: any) {
        console.log("Error Update Banner =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ویرایش بنر",
            errors: err
        }, { status: 500 })
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به ویرایش بنر می باشد"
            }, { status: 401 })
        };

        const { param } = await params;
        if (!isObjectId(param)) {
            return NextResponse.json({
                succcess: false,
                message: "برای ویرایش از id استفاده کنید"
            }, { status: 400 })
        };

        const banner = await Banner.findById(param);
        if (!banner) {
            return NextResponse.json({
                success: false,
                message: "بنر یافت نشد"
            }, { status: 404 })
        };

        if (banner.image) {
            const oldPath = path.join(process.cwd(), "public", banner.image);
            await fs.unlink(oldPath).catch(() => { console.log('Error Remove Image =>', oldPath) });
        };

        await Banner.findByIdAndDelete(param);

        return NextResponse.json({
            success: true,
            message: "بنر باموفقیت حذف شد"
        }, { status: 200 })
    } catch (err: any) {
        console.log("Error Delete Banner =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف بنر",
            errors: err
        }, { status: 500 })
    }
};