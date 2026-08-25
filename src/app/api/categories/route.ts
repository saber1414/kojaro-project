import ConnectedDB from "@/lib/db";
import { Category } from "@/models/Index";
import { authenticate } from "@/middlewares/auth";
import { categorySchema } from "@/validations/categorySchema";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";

interface TreeMenuItem {
    _id: string;
    name: string;
    slug: string;
    parentId: string | null;
    children: TreeMenuItem[];
    icon?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به ایجاد دسته‌بندی می‌باشد",
            }, { status: 401 })
        };

        const formData = await req.formData();

        const name = formData.get("name") as string | null;
        const slug = formData.get("slug") as string | null;
        const parentIdRaw = formData.get("parentId") as string | null;
        const icon = formData.get("icon") as File | null;

        let iconPath: string | null = null;

        if (icon && icon.size > 0) {
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
            }

            if (icon.size > 1 * 1024 * 1024) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "حجم آیکون نباید بیشتر از ۱ مگابایت باشد",
                    },
                    { status: 422 }
                );
            }

            const ext = path.extname(icon.name).toLowerCase();
            const filename = `${uuidv4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            await fs.mkdir(uploadDir, { recursive: true });
            const fullPath = path.join(uploadDir, filename);
            await fs.writeFile(fullPath, Buffer.from(await icon.arrayBuffer()));

            iconPath = `/uploads/${filename}`;
        }

        let parentId: Types.ObjectId | null = null;

        if (parentIdRaw && parentIdRaw !== null && parentIdRaw !== "") {
            if (!Types.ObjectId.isValid(parentIdRaw)) {
                return NextResponse.json({
                    success: false,
                    message: "parentId نامعتبر است"
                }, { status: 400 })
            };

            const parentExists = await Category.findById(parentIdRaw);
            if (!parentExists) {
                return NextResponse.json(
                    { success: false, message: "دسته‌بندی والد یافت نشد" },
                    { status: 404 }
                );
            };


            parentId = new Types.ObjectId(parentIdRaw)
        };

        const dataList = {
            name: name?.trim(),
            slug: slug?.trim(),
            parentId,
            icon: iconPath
        };

        try {
            await categorySchema.validate(dataList, { abortEarly: false });
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

        const existingCategory = await Category.findOne({
            $or: [
                { name: dataList.name },
                { slug: dataList.slug }
            ]
        });
        if (existingCategory) {
            return NextResponse.json({
                success: false,
                message: "نام یا slug تکراری است"
            }, { status: 409 })
        };

        const newCategory = await Category.create(dataList);

        return NextResponse.json({
            success: true,
            message: "دسته‌بندی با موفقیت ایجاد شد",
            data: newCategory
        }, { status: 201 })

    } catch (err: any) {
        console.log("category error =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ایجاد دسته بندی"
        }, { status: 500 })
    }
};

export async function GET() {
    try {
        await ConnectedDB();

        const allCategories = await Category.find({})
            .sort({ createdAt: -1 })
            .select("-__v")
            .lean()

        const categoryMap = new Map<string, TreeMenuItem>();

        allCategories.forEach((item: any) => {
            categoryMap.set(item._id.toString(), {
                _id: item._id.toString(),
                name: item.name,
                slug: item.slug,
                parentId: item.parentId ? item.parentId.toString() : null,
                children: [],
                icon: item.icon ?? null,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            });
        });

        const tree: TreeMenuItem[] = [];

        categoryMap.forEach((item) => {
            if (item.parentId) {
                const parent = categoryMap.get(item.parentId);
                if (parent) {
                    parent.children.push(item);
                } else {
                    tree.push(item);
                }
            } else {
                tree.push(item);
            }
        });

        const sortChildren = (nodes: TreeMenuItem[]) => {
            nodes.sort((a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
            nodes.forEach((node) => {
                if (node.children && node.children.length > 0) {
                    sortChildren(node.children)
                }
            })
        };

        sortChildren(tree);

        return NextResponse.json({
            success: true,
            data: tree
        }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت دسته بندی ها"
        }, { status: 500 })
    }
};