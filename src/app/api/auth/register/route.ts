// app/api/auth/register/route.ts
import ConnectedDB from "@/lib/db";
import { registerSchema } from "@/validations/userSchema";
import { hashedPassword } from "@/utils/auth";
import { User } from "@/models/Index";
import { NextRequest, NextResponse } from "next/server";

const generateRandomUsername = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < 10; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
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

const getRandomDefaultImage = (): string | null => {
    if (defaultProfileImages.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * defaultProfileImages.length);
    return defaultProfileImages[randomIndex];
};

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const body = await req.json();

        try {
            await registerSchema.validate(body, { abortEarly: false });
        } catch (err: any) {
            return NextResponse.json({
                success: false,
                message: "اطلاعات وارد شده معتبر نیست",
                errors: err.errors
            }, { status: 400 });
        }

        const { email, phone, password, fullname } = body;

        const existingUser = await User.findOne({
            $or: [
                { email },
                { phone }
            ]
        });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "این ایمیل یا شماره تلفن قبلاً ثبت شده است"
            }, { status: 409 });
        };

        const userCount = await User.countDocuments();
        const role = userCount === 0 ? "admin" : "user";

        let username = '';
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 10;

        while (!isUnique && attempts < maxAttempts) {
            username = generateRandomUsername();
            const existingUsername = await User.findOne({ username });
            if (!existingUsername) {
                isUnique = true;
            }
            attempts++;
        };

        if (!isUnique) {
            username = `user_${Date.now().toString(36)}`;
        };

        const randomImage = getRandomDefaultImage();

        const hashed = await hashedPassword(password);

        const user = await User.create({
            email,
            phone,
            password: hashed,
            username,
            image: randomImage,
            fullname: fullname || null,
            isVerified: true,
            emailVerified: true,
            phoneVerified: true,
            hasPassword: true,
            role
        });

        return NextResponse.json({
            success: true,
            message: "ثبت‌نام با موفقیت انجام شد",
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    phone: user.phone,
                    username: user.username,
                    fullname: user.fullname,
                    image: user.image,
                    role: user.role,
                    isVerified: user.isVerified,
                    hasPassword: user.hasPassword,
                }
            }
        });

    } catch (err: any) {
        console.error("Register error:", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ثبت‌نام"
        }, { status: 500 });
    }
}