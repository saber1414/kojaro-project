import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");

        return NextResponse.json({
            success: true,
            message: "خروج با موفقیت انجام شد"
        });
    } catch (err: any) {
        console.error("Logout error:", err);
        return NextResponse.json({
            success: false,
            message: "خطا در خروج"
        }, { status: 500 });
    }
}