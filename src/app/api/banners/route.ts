import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Banner } from "@/models/Index";
import { bannerSchema } from "@/validations/bannerSchema";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function GET() {
    try {
        await ConnectedDB();

        const banners = await Banner.find({})
            .sort({ createdAt: -1 })
            .select("-__v")
            .lean()

        return NextResponse.json({
            succcess: true,
            data: banners
        })
    } catch (err: any) {
        console.log("Error Retrieving  Banner =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت بنرها",
            errors: err
        }, { status: 500 })
    }
};

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به ایجاد بنر می باشد"
            }, { status: 401 })
        };

        const formData = await req.formData();

        const title = formData.get("title") as string | null;
        const link = formData.get("link") as string | null;
        const image = formData.get("image") as File | null;

        let imagePath: string | null = null;

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

            const ext = path.extname(image.name);
            const filename = `banner__${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPatch = path.join(uploadDir, filename);

            await fs.writeFile(fullPatch, Buffer.from(await image.arrayBuffer()));

            imagePath = `/uploads/${filename}`
        };

        const data = {
            title: title?.trim(),
            link: link?.trim(),
            image: imagePath
        };

        await bannerSchema.validate(data, { abortEarly: false });

        const existingBanner = await Banner.findOne({
            $or: [
                { title: data.title },
                { link: data.link }
            ]
        });
        if (existingBanner) {
            return NextResponse.json({
                success: false,
                message: "عنوان یا لینک تکراری می باشد"
            }, { status: 409 })
        };

        const banner = await Banner.create(data);

        return NextResponse.json({
            success: true,
            message: "بنر باموفقیت ایجاد شد",
            data: banner
        }, { status: 201 })
    } catch (err: any) {
        console.log("Error Create Banner =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد بنر",
            errors: err
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
                message: "دسترسی غیر مجاز می باشد"
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

        const banners = await Banner.find({
            _id: { $in: isObjectId }
        }).select("_id");

        if (banners.length === 0) {
            return NextResponse.json({
                success: false,
                message: "هیچ بنری یافت نشد"
            })
        };

        const idsToDelete = banners.map((banner) => banner._id);

        const result = await Banner.deleteMany({
            _id: { $in: idsToDelete }
        });

        return NextResponse.json({
            success: true,
            message: `${result.deletedCount} بنر باموفقیت حذف شد`,
            data: {
                deletedCount: result.deletedCount,
                deletedIds: idsToDelete
            }
        })
    } catch (err: any) {
        console.log("Error Delete Banners =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در حذف بنرها",
            error: err
        }, { status: 500 })
    }
};