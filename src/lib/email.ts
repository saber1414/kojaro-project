import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.replace(/\s/g, ""),
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendOTPEmail = async (email: string, code: string): Promise<void> => {
    const html = `
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>کد تایید کجارو</title>
        </head>
        <body style="font-family: 'IRANYekan', Tahoma, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 25px;">
                    <h2 style="color: #0F6CB2; margin: 0;">کجارو</h2>
                    <p style="color: #666; margin: 5px 0 0;">پربازدیدترین رسانه گردشگری ایران</p>
                </div>
                
                <div style="text-align: center; padding: 20px 0;">
                    <h3 style="color: #333; margin-bottom: 15px;">کد تایید شما</h3>
                    <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; font-size: 32px; font-weight: bold; color: #0F6CB2; letter-spacing: 8px; direction: ltr;">
                        ${code}
                    </div>
                    <p style="color: #666; margin-top: 15px; font-size: 14px;">
                        این کد تا ۵ دقیقه اعتبار دارد
                    </p>
                </div>
                
                <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
                    <p>اگر درخواست کد تایید نداده‌اید، این پیام را نادیده بگیرید.</p>
                    <p>© ${new Date().getFullYear()} کجارو - تمامی حقوق محفوظ است</p>
                </div>
            </div>
        </body>
        </html>
    `;

    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("EMAIL_USER یا EMAIL_PASS تنظیم نشده است");
        }

        const info = await transporter.sendMail({
            from: `"کجارو" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "کد تایید کجارو",
            html: html,
        });
        console.log("✅ Email sent successfully:", info.messageId);
    } catch (error: any) {
        console.error("❌ Send email error:", error.message || error);
        throw new Error(`خطا در ارسال ایمیل: ${error.message || "مشکل در اتصال به SMTP"}`);
    }
};