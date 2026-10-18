import ConnectedDB from "@/lib/db";
import { createUserByAdminSchema } from "@/validations/createUserByAdminSchema";
import { hashedPassword } from "@/utils/auth";
import { User } from "@/models/Index";
import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/middlewares/auth";

const generateRandomUsername = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let username = "";

    for (let i = 0; i < 10; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    };
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
    "images/profile23.png",
    "images/profile24.png",
    "images/profile25.png",
    "images/profile26.png",
    "images/profile27.png",
    "images/profile28.png",
    "images/profile29.png",
    "images/profile30.png",
    "images/profile31.png",
    "images/profile32.png",
    "images/profile33.png",
    "images/profile34.png",
    "images/profile35.png",
    "images/profile36.png",
    "images/profile37.png",
    "images/profile38.png",
    "images/profile39.png",
    "images/profile40.png",
    "images/profile40.png",
    "images/profile41.png",
    "images/profile42.png",
    "images/profile43.png",
    "images/profile44.png",
    "images/profile45.png",
];

const getRandomDefaultImage = () => {
    if (defaultProfileImages.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * defaultProfileImages.length);

    return defaultProfileImages[randomIndex]
};

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const admin = await authenticate(req);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "فقط مدیر مجاز به ایجاد کاربر می باشد",
            }, { status: 401 })
        };

        const body = await req.json();

        try {
            await createUserByAdminSchema.validate(body, { abortEarly: false })
        } catch {
            return NextResponse.json({
                success: false,
                message: "اطلاعات وارد شده معتبر نیست",
            }, { status: 400 })
        };

        const { fullname, username: rawUsername, email, phone, password, role } = body;

        const orQuery: any[] = [{ email: email.toLowerCase().trim() }];
        if (phone) orQuery.push({ phone: String(phone).trim() });

        const existing = await User.findOne({ $or: orQuery });
        if (existing) {
            return NextResponse.json({
                success: false,
                message: "این ایمیل یا شماره تلفن قبلاً ثبت شده است",
            }, { status: 409 })
        };

        let username = (rawUsername || "").toLowerCase().trim();
        if (username) {
            const taken = await User.findOne({ username });
            if (taken) {
                return NextResponse.json({
                    success: false,
                    message: "این نام کاربری تکراری است"
                }, { status: 409 })
            }
        } else {
            let isUnique = false;
            let attempts = 0;

            while (!isUnique && attempts < 10) {
                username = generateRandomUsername();
                const existing = await User.findOne({ username });
                if (!existing) isUnique = true;
                attempts++
            };

            if (!isUnique) username = `user_${Date.now().toString(36)}`
        };

        const hashed = await hashedPassword(password);

        const user = await User.create({
            email: email.toLowerCase().trim(),
            phone: phone || null,
            password: hashed,
            username,
            fullname: fullname?.trim() || null,
            image: getRandomDefaultImage(),
            role,
            isVerified: true,
            emailVerified: true,
            phoneVerified: !!phone,
            hasPassword: true,
        });

        return NextResponse.json({
            success: true,
            message: "کاربر با موفقیت ایجاد شد",
            data: {
                id: user._id,
                email: user.email,
                phone: user.phone,
                username: user.username,
                fullname: user.fullname,
                role: user.role,
                image: user.image,
                hasPassword: user.hasPassword,
            },
        }, { status: 201 })

    } catch (err: any) {
        console.log("Error Register =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ثبت نام کاربر",
            error: err
        }, { status: 500 })
    }
};