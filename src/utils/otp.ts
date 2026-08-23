import OTP from "@/models/OTP";
import { sendOTPEmail } from "@/lib/email";
import { createToken } from "@/utils/auth";

export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createOTP = async (identifier: string, type: 'email' | 'phone'): Promise<string> => {
    await OTP.deleteMany({ identifier, type, isUsed: false });

    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.create({
        identifier,
        code,
        type,
        expiresAt,
        isUsed: false
    });

    return code;
};

export const sendOtp = async (identifier: string, type: 'email' | 'phone'): Promise<void> => {
    try {
        const code = await createOTP(identifier, type);
        
        console.log(`📧 [DEV] کد OTP برای ${identifier}: ${code}`);

        if (type === 'email') {
            await sendOTPEmail(identifier, code);
        } else {
            console.log(`📱 [DEV] پیامک به ${identifier}: ${code}`);
            // TODO: Kavenegar
        }

    } catch (err: unknown) {
        console.error("Send OTP error:", err);
        throw new Error("خطا در ارسال کد تایید");
    }
};

export const verifyOTP = async (identifier: string, code: string): Promise<boolean> => {
    const otp = await OTP.findOne({
        identifier,
        code,
        isUsed: false,
        expiresAt: { $gt: new Date() }
    });

    if (!otp) return false;

    otp.isUsed = true;
    await otp.save();
    return true;
};