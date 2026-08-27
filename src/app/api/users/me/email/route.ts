import ConnectedDB from "@/lib/db";
import { authenticate } from "@/middlewares/auth";
import { User } from "@/models/Index";
import { sendOtp, verifyOTP } from "@/utils/otp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await ConnectedDB();

        const currentUser = await authenticate(req);
        if (!currentUser) {
            return NextResponse.json({
                success: false,
                message: "وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const body = await req.json();

        const { identifier } = body;

        if (!identifier || identifier === currentUser.email) {
            return NextResponse.json({
                success: false,
                message: "ایمیل جدید معتبر نیست"
            }, { status: 400 })
        };

        const existingEmail = await User.findOne({ email: identifier });
        if (existingEmail) {
            return NextResponse.json({
                success: false,
                message: "ایمیل تکراری می باشد"
            }, { status: 400 })
        };

        await sendOtp(identifier, "email");

        return NextResponse.json({
            success: true,
            message: "کد تایید باموفقیت ارسال شد"
        }, { status: 201 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در ارسال کد تایید"
        }, { status: 500 })
    }
};

export async function PUT(req: NextRequest) {
    try {
        await ConnectedDB();

        const currentUser = await authenticate(req);
        if (!currentUser) {
            return NextResponse.json({
                success: false,
                message: 'وارد حساب کاربری خود شوید'
            }, { status: 401 })
        };

        const body = await req.json();

        const { identifier, code } = body;

        const isValid = await verifyOTP(identifier, code);
        if (!isValid) {
            return NextResponse.json({
                success: false,
                message: "کد تایید نامعتبر یا منقضی شده است"
            }, { status: 400 })
        };

        const user = await User.findByIdAndUpdate(
            currentUser.email,
            {
                email: identifier,
                emailVerified: false,
            },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            message: "ایمیل با موفقیت تغییر یافت",
            data: { user }
        }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "خطا در تایید کد"
        }, { status: 500 })
    }
};