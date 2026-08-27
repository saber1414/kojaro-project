import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { User } from "@/models/Index";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuid4 } from "uuid";
import { userSchema } from "@/validations/userSchema";


export async function PUT(req: NextRequest) {
    try {
        await ConnectedDB();

        const currentUser = await authenticate(req);
        if (!currentUser) {
            return NextResponse.json({
                success: false,
                message: "وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const contentType = req.headers.get("content-type") || "";

        let body: any = {};
        let imageFile: File | null = null;

        if (contentType.includes("multipart/form-dat")) {
            const formData = await req.formData();

            body = {
                fullname: formData.get("fullname") as string | null,
                username: formData.get("username") as string | null,
                dateOfBirth: formData.get("dateOfBirth") as string | null,
                city: formData.get("city") as string | null,
                website: formData.get("website") as string | null,
                socialLinks: {
                    instagram: formData.get("socialLinks.instagram") as string | null,
                    twitter: formData.get("socialLinks.twitter") as string | null,
                    telegram: formData.get("socialLinks.telegram") as string | null,
                    linkedin: formData.get("socialLinks.linkedin") as string | null,
                },
            };
            imageFile = formData.get("image") as File | null;
        } else {
            body = await req.json();
        };

        try {
            await userSchema.validate(body, { abortEarly: false })
        } catch (err: any) {
            return NextResponse.json({
                success: false,
                message: "اطلاعات وارد شده معتبر نیست"
            }, { status: 400 })
        };

        const user = await User.findById(currentUser._id);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "کاربر یافت نشد"
            }, { status: 404 })
        };

        if (body.username && body.username !== user.username) {
            const exstiongUser = await User.findOne({
                username: body.username.toLowerCase().trim(),
                _id: { $ne: user._id }
            });
            if (exstiongUser) {
                return NextResponse.json({
                    success: false,
                    message: "این نام کاربری قبلا استفاده شده است"
                }, { status: 409 })
            };
        };

        let newImagePath: string | undefined | null = null;

        if (imageFile && imageFile.size > 0) {
            const allowedTypes = ["image/png", "image/webp", "image/jpeg", "image/jpg"];
            if (!allowedTypes.includes(imageFile.type)) {
                return NextResponse.json({
                    success: false,
                    message: "فرمت‌های مجاز عکس: jpg, png, webp",
                }, { status: 422 })
            };

            if (imageFile.size > 2 * 1024 * 1024) {
                return NextResponse.json({
                    success: false,
                    message: "حجم فایل نباید بیشتر از 2 مگابایت باشد"
                }, { status: 422 })
            };

            if (user.image && user.image.startsWith("/uploads/")) {
                const oldImage = path.join(process.cwd(), "public", user.image);
                await fs.unlink(oldImage)
            };

            const ext = path.extname(imageFile.name);
            const filename = `${uuid4()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            await fs.mkdir(uploadDir, { recursive: true });

            const fullPath = path.join(uploadDir, filename);

            await fs.writeFile(fullPath, Buffer.from(await imageFile.arrayBuffer()));

            newImagePath = `/uploads/${filename}`;
        };

        const updateData: any = {};

        if (body.fullname !== undefined) updateData.fullname = body.fullname?.trim() || null;
        if (body.username !== undefined) updateData.username = body.username?.trim() || null;
        if (body.bio !== undefined) updateData.bio = body.bio?.trim() || null;
        if (body.city !== undefined) updateData.city = body.city?.trim() || null;
        if (body.dateOfBirth !== undefined) updateData.dateOfBirth = body.dateOfBirth?.trim() || null;
        if (body.website !== undefined) updateData.website = body.website?.trim() || null;
        if (newImagePath) updateData.newImagePath = newImagePath;
        if (body.socialLinks !== undefined) {
            updateData.socialLinks = {
                instagram: body.socialLinks?.instagram?.trim() || null,
                twitter: body.socialLinks?.twitter?.trim() || null,
                telegram: body.socialLinks?.telegram?.trim() || null,
                linkedin: body.socialLinks?.linkedin?.trim() || null,
            };
        };

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $set: updateData },
            { new: true }
        ).select("-password -__v").lean();

        return NextResponse.json({
            success: true,
            message: "پروفایل باموفقیت بروزرسانی شد",
            data: updatedUser
        }, { status: 200 })

    } catch (err: any) {
        console.error("Update profile error =>", err);
        return NextResponse.json(
            {
                success: false,
                message: "خطا در به‌روزرسانی پروفایل",
            },
            { status: 500 }
        );
    }
}