import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { List } from "@/models/Index";
import { listSchema } from "@/validations/listSchema";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);

        const onlyActive = searchParams.get("active") !== "false";
        const featured = searchParams.get("featured");

        const query: any = {};

        if (onlyActive) query.isActive = true;
        if (featured === "true") query.isFeatured = true;

        const lists = await List.find(query)
            .populate({
                path: "articles.article",
                select: "title slug excerpt coverImage status views readingTime publishedAt author category",
                populate: [
                    { path: "author", select: "fullname username image" },
                    { path: "category", select: "name slug" }
                ]
            })
            .populate("createdBy", "fullname username")
            .sort({ order: 1, createdAt: -1 })
            .select("-__v")
            .lean();

        const user = await authenticate(req);
        const isAdmin = user?.role === "admin";

        const cleaned = lists.map((list) => {
            if (isAdmin) return list;

            return {
                ...list,
                articles: (list.articles || []).filter((item: any) => item.article.status === "published")
                    .sort((a: any, b: any) => a.order - b.order)
            };
        });

        return NextResponse.json({
            success: true,
            data: cleaned,
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت لیست",
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
                message: "فقط مدیر مجاز به ایجاد لیست است",
            }, { status: 401 })
        };

        const formData = await req.formData();

        const title = formData.get("title") as string | null;
        const slug = formData.get("slug") as string | null;
        const description = formData.get("description") as string | null;
        const coverImage = formData.get("coverImage") as File | null;
        const isActive = formData.get("isActive") !== "false";
        const isFeatured = formData.get("isFeatured") === "true";
        const order = parseInt((formData.get("order") as string) || "0");

        let coverImagePath: string | null = null;

        if (coverImage && coverImage.size > 0) {
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

            const ext = path.extname(coverImage.name);
            const filename = `list__${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads", "lists");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPath = path.join(uploadDir, filename);

            await fs.writeFile(fullPath, Buffer.from(await coverImage.arrayBuffer()));

            coverImagePath = `/uploads/${filename}`;
        };

        const data = {
            title: title?.trim(),
            slug: slug?.trim().toLowerCase(),
            description: description?.trim() || null,
            isActive,
            isFeatured,
            order: isNaN(order) ? 0 : order,
            coverImage: coverImagePath
        };

        listSchema.validate(data, { abortEarly: false });

        const existingList = await List.findOne({
            $or: [
                { title: data.title },
                { slug: data.slug }
            ]
        });
        if (existingList) {
            return NextResponse.json({
                success: false,
                message: "مسیر یا عنوان تکراری می باشد"
            }, { status: 409 })
        };

        const list = await List.create({
            ...data,
            createdBy: admin._id,
            articles: [],
        });


        return NextResponse.json({
            success: true,
            message: "لیست باموفقیت ایجاد شد",
            data: list
        }, { status: 201 })
    } catch (err: any) {
        console.log("Error list =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد لیست",
            errors: err
        }, { status: 500 })
    }
};