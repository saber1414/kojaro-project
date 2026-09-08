import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { Advertisement } from "@/models/Index";
import { adSchema } from "@/validations/advertisementSchema";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);

        const position = searchParams.get("position");
        const onlyActive = searchParams.get("active") !== "false";
        const onlyValid = searchParams.get("valid") === "true"

        const query: any = {};

        if (onlyActive) query.isActive = true;
        if (position) query.position = position;
        if (onlyValid) {
            const now = new Date();
            query.startDate = { $lte: now };
            query.endDate = { $gte: now }
        };

        const ads = await Advertisement.find(query)
            .sort({ order: 1, createdAt: -1 })
            .populate("createdBy", "fullname username image")
            .select("-__v")
            .lean()

        return NextResponse.json({
            success: true,
            data: ads
        }, { status: 200 })

    } catch (err: any) {
        console.log("Error Advertisement =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت لیست تبلیغات",
            error: err
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
                message: "فقط مدیر مجاز به ایجاد تبلیغ می باشد"
            }, { status: 401 })
        };

        const formData = await req.formData();

        const title = formData.get("title") as string | null;
        const link = formData.get("link") as string;
        const imageFile = formData.get("image") as File | null;
        const alt = formData.get("alt") as string | null;
        const advertiserName = formData.get("advertiserName") as string | null;
        const startDateRow = formData.get("startDate") as string | null;
        const endDateRow = formData.get("endDate") as string | null;
        const isActiveRow = formData.get("isActive");
        const orderRow = formData.get("order");
        const position = (formData.get("position") as string) || "home";

        const existingAd = await Advertisement.findOne({ link: link.trim() });
        if (existingAd) {
            return NextResponse.json({
                success: false,
                message: "این لینک قبلاً برای یک تبلیغ دیگر ثبت شده است"
            }, { status: 409 });
        }

        let imagePath: string | null = null;

        if (imageFile && imageFile.size > 0) {
            const allowedTypes = ["image/png", "image/webp", "image/jpg", "image/jpeg", "image/svg+xml", "image/gif"];
            if (!allowedTypes.includes(imageFile.type)) {
                return NextResponse.json({
                    success: false,
                    message: "فرمت تصویر معتبر نیست"
                }, { status: 422 })
            };
            if (imageFile.size > 5 * 1024 * 1024) {
                return NextResponse.json({
                    success: false,
                    message: "حداکثر مجاز 5 مگابایت"
                }, { status: 422 })
            };

            const ext = path.extname(imageFile.name);
            const filename = `ad__${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPatch = path.join(uploadDir, filename);

            await fs.writeFile(fullPatch, Buffer.from(await imageFile.arrayBuffer()));

            imagePath = `/uploads/${filename}`
        };

        const data = {
            title: title?.trim() || null,
            link: link,
            image: imagePath,
            alt: alt?.trim() || null,
            advertiserName: advertiserName?.trim() || null,
            startDate: startDateRow ? new Date(startDateRow) : null,
            endDate: endDateRow ? new Date(endDateRow) : null,
            isActive: true,
            order: orderRow ? parseInt(String(orderRow), 10) : 0,
            position
        };

        if (isActiveRow !== null && isActiveRow !== undefined) {
            const value = String(isActiveRow).trim().toLowerCase();
            if (value === "false" || value === "0") {
                data.isActive = false;
            } else if (value === "true" || value === "1") {
                data.isActive = true;
            }
        }

        await adSchema.validate(data, { abortEarly: false });

        const ad = await Advertisement.create({
            ...data,
            createdBy: admin._id,
        });

        return NextResponse.json({
            success: true,
            message: "تبلیغ با موفقیت ایجاد شد",
            data: ad
        }, { status: 201 })

    } catch (err: any) {
        console.log("Error Advertisement =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد تبلیغ",
            error: err
        }, { status: 500 })
    }
};

