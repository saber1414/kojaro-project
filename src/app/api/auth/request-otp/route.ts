import ConnectedDB from "@/lib/db";
import { User } from "@/models/Index";
import { requestOTPSchema } from "@/validations/userSchema";
import { sendOtp } from "@/utils/otp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const body = await req.json();

        try {
            await requestOTPSchema.validate(body, { abortEarly: false })
        } catch (err: any) {
            return NextResponse.json({
                success: false,
                message: "اطلاعات وارد شده معتبر نیست",
                errors: err.errors
            }, { status: 400 })
        };

        const { identifier } = body;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const type = isEmail ? "email" : "phone";


        const user = await User.findOne({
            [isEmail ? "email" : "phone"]: identifier
        });

        await sendOtp(identifier, type);

        return NextResponse.json({
            success: true,
            message: "کد تایید ارسال شد",
            data: {
                identifier,
                type,
                isNewUser: !user,
                hasPassword: user?.hasPassword || false  
            }
        }, { status: 201 })

    } catch (err: any) {
        console.log("Request OTP error", err);
        return NextResponse.json({
            success: false,
            message: "خطا در ارسال کد تایید"
        }, { status: 500 })
    }
}