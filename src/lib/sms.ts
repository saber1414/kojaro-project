import axios from "axios";

export const sendOTPSMS = async (phone: string, code: string): Promise<void> => {
    try {
        const response = await axios.post(
            "https://api.kavenegar.com/v1/YOUR-API-KEY/sms/send.json",
            {
                receptor: phone,
                message: `کد تایید کجارو: ${code}\n\nاین کد تا ۵ دقیقه اعتبار دارد.`,
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        if (response.data.return.status !== 200) {
            throw new Error("خطا در ارسال پیامک");
        }
    } catch (err: unknown) {
        console.error("SMS send error:", err);
        throw new Error("خطا در ارسال پیامک");
    }
};