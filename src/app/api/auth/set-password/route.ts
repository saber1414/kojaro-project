import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { User } from "@/models/Index";
import { hashedPassword } from "@/utils/auth";
import { setPasswordSchema } from "@/validations/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const body = await req.json();

        try {
            await setPasswordSchema.validate(body, { abortEarly: false })
        } catch (err: any) {
            return NextResponse.json({
                success: false,
                message: "اطلاعات وارد شده معتبر نیست",
                errors: err.errors
            }, { status: 400 })
        };

        const hashed = await hashedPassword(body.password);

        await User.findById(user._id, {
            password: hashed,
            hasPassword: true
        })

        return NextResponse.json({
            success: true,
            message: "رمز عبور با موفقیت تنظیم شد"
        });

    } catch (err: any) {
        console.error("Set password error:", err);
        return NextResponse.json({
            success: false,
            message: "خطا در تنظیم رمز عبور"
        }, { status: 500 });
    }
}