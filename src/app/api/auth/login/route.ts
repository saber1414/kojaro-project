import ConnectedDB from "@/lib/db";
import { createToken, verifyPassword } from "@/utils/auth";
import { User } from "@/models/Index";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const body = await req.json();

        const { identifier, password } = body;

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const filed = isEmail ? "email" : "phone";

        const user = await User.findOne({ [filed]: identifier })

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "کاربری با این اطلاعات یافت نشد"
            }, { status: 404 })
        };

        if (!user.password) {
            return NextResponse.json({
                success: false,
                message: "رمز عبور معتبر نمی باشد لطفا از طریق کد تایید وارد شوید"
            }, { status: 400 })
        };

        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({
                success: false,
                message: "اطلاعات وارد شده اشتباه می باشد"
            }, { status: 401 })
        };

        const token = createToken({
            id: user._id.toString(),
            email: user.email,
            phone: user.phone
        });

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        });

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
                    isVerified: user.isVerified
                }
            }
        });

    } catch (err: any) {
        console.error("Login error:", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ورود"
        }, { status: 500 });
    }
}