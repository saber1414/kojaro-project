import ConnectedDB from "@/lib/db";
import { Category } from "@/models/Index";
import { authenticate } from "@/middlewares/auth";
import { categorySchema } from "@/validations/categorySchema";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(_: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const { param } = await params;
        let category;

        if (isObjectId(param)) {
            category = await Category.findById(param)
                .select("-__v")
                .lean()
        } else {
            category = await Category.findOne({ slug: param })
                .select("-__v")
                .lean()
        };

        if (!category) {
            return NextResponse.json({
                success: false,
                message: "دسته بندی یافت نشد"
            }, { status: 404 })
        };

        return NextResponse.json({
            success: true,
            data: category
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت دسته بندی"
        }, { status: 500 })
    }
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به ویرایش دسته بندی می باشد"
            }, { status: 401 })
        };

        const { param } = await params;
        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "برای ویرایش باید از id استفاده کنید",
            }, { status: 400 })
        };

        const category = await Category.findById(param);
        if (!category) {
            return NextResponse.json(
                { success: false, message: "دسته‌بندی یافت نشد" },
                { status: 404 }
            );
        };

        const formData = await req.formData();

        const name = formData.get("name") as string | null;
        const slug = formData.get("slug") as string | null;
        const parentIdRaw = formData.get("parentId") as string | null;
        const icon = formData.get("icon") as File | null;
        const removeIcon = formData.get("removeIcon") === "true";

        let iconPath: string | null | undefined = undefined;
        const hasNewIcon = icon && typeof icon !== "string" && "size" in icon && icon.size > 0 && icon.name;

        if (removeIcon) {
            if (category.icon) {
                const oldPath = path.join(process.cwd(), "public", category.icon);
                await fs.unlink(oldPath).catch(() => { });
            };
            iconPath = null
        } else if (hasNewIcon) {
            const allowedTypes = [
                "image/svg+xml",
                "image/png",
                "image/jpeg",
                "image/jpg",
                "image/webp",
            ];

            if (!allowedTypes.includes(icon.type)) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "فرمت‌های مجاز: svg, png, jpeg, jpg, webp",
                    },
                    { status: 422 }
                );
            };

            if (icon.size > 1 * 1024 * 1024) {
                return NextResponse.json({
                    success: false,
                    message: "حجم آیکون نباید بیشتر از ۱ مگابایت باشد",
                }, { status: 422 })
            };

            if (category.icon) {
                const oldPath = path.join(process.cwd(), "public", category.icon);
                await fs.unlink(oldPath).catch(() => { });
            };

            const ext = path.extname(icon.name).toLowerCase();
            const filename = `${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPath = path.join(uploadDir, filename);

            await fs.writeFile(fullPath, Buffer.from(await icon.arrayBuffer()));

            iconPath = `/uploads/${filename}`
        };

        let parentId: Types.ObjectId | null | undefined = undefined;

        if (parentIdRaw !== null && parentIdRaw !== undefined) {
            if (parentIdRaw === "" || parentIdRaw === "null") {
                parentId = null;
            } else {
                if (!Types.ObjectId.isValid(parentIdRaw)) {
                    return NextResponse.json(
                        { success: false, message: "parentId نامعتبر است" },
                        { status: 400 }
                    );
                };

                if (parentIdRaw === param) {
                    return NextResponse.json(
                        {
                            success: false,
                            message: "دسته‌بندی نمی‌تواند والد خودش باشد",
                        },
                        { status: 400 }
                    );
                };

                const parentExists = await Category.findById(parentIdRaw);
                if (!parentExists) {
                    return NextResponse.json(
                        { success: false, message: "دسته‌بندی والد یافت نشد" },
                        { status: 404 }
                    );
                }

                parentId = new Types.ObjectId(parentIdRaw);
            }
        };

        const updateData: any = {};
        if (name && name.trim()) updateData.name = name.trim();
        if (slug && slug.trim()) updateData.slug = slug.trim();
        if (parentId !== undefined) updateData.parentId = parentId;
        if (iconPath !== undefined) updateData.icon = iconPath;

        try {
            await categorySchema.validate(
                {
                    name: updateData.name ?? category.name,
                    slug: updateData.slug ?? category.slug,
                    icon: updateData.icon ?? category.icon,
                },
                { abortEarly: false }
            );
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

        const updated = await Category.findByIdAndUpdate(param, updateData, { new: true })
            .select("-__v");

        return NextResponse.json({
            success: true,
            message: "دسته بندی باموفقیت ویرایش شد",
            data: updated
        }, { status: 200 })

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
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به حذف دسته بندی می باشد"
            }, { status: 401 })
        };

        const { param } = await params;

        if (!isObjectId(param)) {
            return NextResponse.json({
                success: false,
                message: "از id برای حذف استفاده کنید"
            }, { status: 400 })
        };

        const category = await Category.findById(param);
        if (!category) {
            return NextResponse.json({
                success: false,
                message: "دسته بندی یافت نشد"
            }, { status: 404 })
        };

        const getAllDescendantIds = async (parentId: string): Promise<string[]> => {
            const children = await Category.find({ parentId }).select("_id").lean();
            let ids = children.map((category) => category._id.toString());

            for (const child of children) {
                const childeIds = await getAllDescendantIds(child._id.toString());
                ids = ids.concat(childeIds)
            };

            return ids;
        };

        const descendantIds = await getAllDescendantIds(param);
        const allIdsToDelete = [param, ...descendantIds];

        const categoriesToDelete = await Category.find({
            _id: { $in: allIdsToDelete }
        }).select("icon");

        for (const item of categoriesToDelete) {
            if (item.icon) {
                const iconPath = path.join(process.cwd(), "public", item.icon);
                await fs.unlink(iconPath)
            }
        };

        await Category.deleteMany({
            _id: { $in: allIdsToDelete }
        });

        return NextResponse.json({
            success: true,
            message: descendantIds.length > 0 ? `دسته‌بندی و ${descendantIds.length} زیردسته با موفقیت حذف شد` : "دسته بندی باموفقیت حذف شد",
            data: {
                deletedCount: allIdsToDelete.length,
                deletedIds: allIdsToDelete
            }
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در حذف دسته بندی"
        }, { status: 500 })
    }
};