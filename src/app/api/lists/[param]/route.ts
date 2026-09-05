import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { List } from "@/models/Index";
import { updateListSchema } from "@/validations/listSchema";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(_: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {

        await ConnectedDB();

        const { param } = await params;

        let list;

        if (isObjectId(param)) {
            list = await List.findById(param)
                .populate({
                    path: "articles.article",
                    select: "title slug coverImage status views readingTime publishedAt author category content",
                    populate: [
                        { path: "author", select: "fullname username image" },
                        { path: "category", select: "name slug" },
                    ]
                })
                .populate("createdBy", "fullname username")
                .select("-__v")
                .lean()
        } else {
            list = await List.findOne({ slug: param })
                .populate({
                    path: "articles.article",
                    select: "title alg coverImage status views readingTime publishedAt author category content",
                    populate: [
                        { path: "author", select: "fullname username" },
                        { path: "category", select: "name slug" }
                    ]
                })
                .populate("createdBy", "fullname username")
                .select("-__v")
                .lean()
        };

        if (!list) {
            return NextResponse.json({
                success: false,
                message: "لیست یافت نشد",
            }, { status: 404 })
        };

        if (list.articles.length) {
            list.articles.sort((a: any, b: any) => a.order - b.order)
        };

        return NextResponse.json({
            success: true,
            data: list
        }, { status: 200 });

    } catch (err: any) {
        console.log("Error One List =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت لیست"
        }, { status: 500 })
    }
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به ویرایش لیست می باشد"
            }, { status: 401 })
        };

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "برای ویرایش از id استفاده کنید"
            }, { status: 400 })
        };

        const list = await List.findById(param);
        if (!list) {
            return NextResponse.json({
                success: false,
                message: "لیست یافت نشد"
            }, { status: 404 })
        };


        const formData = await req.formData();

        let updateData: any = {};

        const title = formData.get("title") as string | null;
        const slug = formData.get("slug") as string | null;
        const description = formData.get("description") as string | null;
        const isActiveRaw = formData.get("isActive");
        const isFeaturedRaw = formData.get("isFeatured");
        const orderRaw = formData.get("order");
        const coverImage = formData.get("coverImage") as File | null;
        const removeCover = formData.get("removeCover") === "true";

        if (title) updateData.title = title.trim();
        if (slug) updateData.slug = slug.trim().toLowerCase();
        if (description !== null) {
            updateData.description = description.trim()
        };
        if (isActiveRaw !== null && isActiveRaw !== undefined) {
            if (typeof isActiveRaw === "object" && "size" in (isActiveRaw as any)) {
            } else {
                const value = String(isActiveRaw).toLowerCase().trim();
                if (value === "false" || value === "0" || value === "off" || value === "no") {
                    updateData.isActive = false;
                } else if (value === "true" || value === "1" || value === "on" || value === "yes") {
                    updateData.isActive = true;
                }
            }
        }
        if (isFeaturedRaw !== null && isFeaturedRaw !== undefined) {
            if (!(typeof isFeaturedRaw === "object" && "size" in (isFeaturedRaw as any))) {
                const value = String(isFeaturedRaw).toLowerCase().trim();

                if (value === "true" || value === "1" || value === "on" || value === "yes") {
                    updateData.isFeatured = true;
                } else if (value === "false" || value === "0" || value === "off" || value === "no") {
                    updateData.isFeatured = false;
                }
            }
        }
        if (orderRaw !== null && orderRaw !== undefined && orderRaw !== "") {
            const order = parseInt(orderRaw as string);
            if (!isNaN(order)) updateData.order = order
        };
        if (removeCover) {
            if (list.coverImage) {
                const oldPath = path.join(process.cwd(), "public", list.coverImage);
                await fs.unlink(oldPath).catch(() => { });
            }
            updateData.coverImage = null;
        } else if (coverImage && coverImage.size > 0) {
            const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/svg+xml"];
            if (!allowedTypes.includes(coverImage.type)) {
                return NextResponse.json({
                    success: false,
                    message: "فرمت نامعتبر می باشد"
                }, { status: 422 })
            };

            if (coverImage.size > 3 * 1024 * 1024) {
                return NextResponse.json({
                    success: false,
                    message: "حجم تصویر حداکثر 3 مگابایت"
                }, { status: 422 })
            };

            if (list.coverImage) {
                const oldPath = path.join(process.cwd(), "public", list.coverImage);
                await fs.unlink(oldPath).catch(() => { });
            }

            const ext = path.extname(coverImage.name);
            const filename = `list__${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "lists");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPath = path.join(uploadDir, filename);

            await fs.writeFile(fullPath, Buffer.from(await coverImage.arrayBuffer()));

            updateData.coverImage = `/uploads/lists/${filename}`;
        };

        await updateListSchema.validate(
            {
                title: updateData.title ?? list.title,
                slug: updateData.slug ?? list.slug
            },
            { abortEarly: false }
        );

        const updated = await List.findByIdAndUpdate(param, updateData, { new: true })
            .populate("createdBy", "fullname username")
            .lean();

        return NextResponse.json({
            success: true,
            message: "لیست باموفقیت ویرایش شد",
            data: updated
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Edit List =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ویرایش لیست"
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
                message: "فقط مدیر مجاز به حذف لیست می باشد"
            }, { status: 401 })
        };

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "برای حذف از id استفاده کنید"
            }, { status: 400 })
        };

        const list = await List.findById(param);
        if (!list) {
            return NextResponse.json({
                success: false,
                message: "لیست یافت نشد"
            }, { status: 404 })
        };

        if (list.coverImage) {
            const oldPath = path.join(process.cwd(), "public", list.coverImage);
            await fs.unlink(oldPath).catch(() => { });
        };

        await List.findByIdAndDelete(param);

        return NextResponse.json({
            success: false,
            message: "لیست باموفقیت حذف شد"
        }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در حذف لیست"
        }, { status: 500 })
    }
};