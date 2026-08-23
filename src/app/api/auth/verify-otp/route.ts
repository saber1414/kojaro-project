import ConnectedDB from "@/lib/db";
import { verifyOTPSchema } from "@/validations/userSchema";
import { verifyOTP } from "@/utils/otp";
import { createToken } from "@/utils/auth";
import { User } from "@/models/Index";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const generateRandomUsername = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';

    for (let i = 0; i <= 10; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return username
};

const defaultProfileImages = [
    "images/profile01.webp",
    "images/profile02.webp",
    "images/profile03.webp",
    "images/profile04.png",
    "images/profile06.png",
    "images/profile07.png",
    "images/profile08.png",
    "images/profile09.png",
    "images/profile10.png",
    "images/profile11.png",
    "images/profile12.png",
    "images/profile13.png",
    "images/profile14.png",
    "images/profile15.png",
    "images/profile16.png",
    "images/profile17.png",
    "images/profile18.png",
    "images/profile19.png",
    "images/profile20.png",
    "images/profile21.png",
    "images/profile22.png",
];

const getRandomDefaultImage = () => {
    if (defaultProfileImages.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * defaultProfileImages.length);
    return defaultProfileImages[randomIndex];
};

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const body = await req.json();

        await verifyOTPSchema.validate(body, { abortEarly: false });

        const { identifier, code } = body;

        const isValid = await verifyOTP(identifier, code);
        if (!isValid) {
            return NextResponse.json({
                success: false,
                message: "کد تایید نامعتبر یا منقضی شده است"
            }, { status: 400 });
        }

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const field = isEmail ? "email" : "phone";

        let user = await User.findOne({ [field]: identifier });

        if (!user) {
            const userCount = await User.countDocuments();
            const role = userCount === 0 ? "admin" : "user";

            const randomImage = getRandomDefaultImage();
            const username = generateRandomUsername();

            user = await User.create({
                [field]: identifier,
                username,
                image: randomImage,
                isVerified: true,
                [isEmail ? "emailVerified" : "phoneVerified"]: true,
                hasPassword: false,
                role,
            });
        } else {
            user.isVerified = true;
            if (isEmail) user.emailVerified = true;
            else user.phoneVerified = true;
            await user.save();
        }

        const token = createToken({
            id: user._id.toString(),
            email: user.email,
            phone: user.phone,
        });

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        const needsPassword = !user.hasPassword;

        return NextResponse.json({
            success: true,
            message: "ورود موفقیت‌آمیز بود",
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    fullname: user.fullname,
                    username: user.username,
                    image: user.image,
                    role: user.role,
                    hasPassword: user.hasPassword,
                    isVerified: user.isVerified,
                },
                needsPassword,
            },
        });
    } catch (err: any) {
        console.error("Verify OTP error:", err);
        return NextResponse.json({
            success: false,
            message: "خطا در تایید کد"
        }, { status: 500 });
    }
};