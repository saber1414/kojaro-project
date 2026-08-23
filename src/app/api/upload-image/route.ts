import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({
                success: false,
                message: "خطا در ارسال فایل"
            }, { status: 400 })
        };

        const bytes = await file.arrayBuffer();
        const buffer = await Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { folder: "kojaro" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            upload.end(buffer);
        });

        return NextResponse.json({ url: (result as any).secure_url });
    } catch (err: any) {
        console.error("Register error:", err);
        return NextResponse.json({
            success: false,
            message: "خطا در اپلود فایل"
        }, { status: 500 });
    }
};