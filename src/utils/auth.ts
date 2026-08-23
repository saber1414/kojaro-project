import { sign, verify, type JwtPayload } from "jsonwebtoken";
import { compare, hash } from "bcrypt";

interface JWTPayload extends JwtPayload {
    id: string;
    email?: string;
    phone?: string;
}

// hashed password
export const hashedPassword = async (password: string): Promise<string> => {
    try {
        if (!password) throw new Error("رمز عبور معتبر نیست");
        return await hash(password, 10);
    } catch (err: unknown) {
        console.log("Err =>", err);
        throw new Error("خطا در هش کردن رمز عبور");
    }
};

// verify password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    try {
        if (!password || !hash) return false;
        return await compare(password, hash);
    } catch (err: unknown) {
        console.log("Err =>", err);
        return false;
    }
};

// create token
export const createToken = (data: { id: string; email?: string; phone?: string }): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET در محیط تعریف نشده است");

    if (!data.id) {
        throw new Error("شناسه کاربر معتبر نیست");
    }

    if (!data.email && !data.phone) {
        throw new Error("ایمیل یا شماره موبایل معتبر نیست");
    }

    try {
        const token = sign(
            {
                id: data.id,
                email: data.email,
                phone: data.phone,
            },
            secret,
            { expiresIn: "7d" }
        );
        return token;
    } catch (err: unknown) {
        console.log("Err =>", err);
        throw new Error("خطا در ایجاد توکن");
    }
};

export const verifyToken = (token: string): JWTPayload | null => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET در محیط تعریف نشده است");

    if (!token || token.split(".").length !== 3) {
        return null;
    }

    try {
        const decode = verify(token, secret) as JWTPayload;

        if (typeof decode === "object" && decode.id) {
            return {
                id: decode.id,
                email: decode.email,
                phone: decode.phone,
            };
        }

        return null;
    } catch (err: unknown) {
        console.log("Err =>", err);
        return null;
    }
};