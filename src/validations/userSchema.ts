import * as yup from "yup";

export const registerSchema = yup.object().shape({
    fullname: yup.string()
        .required("نام کامل الزامی است")
        .min(3, "نام کامل باید حداقل ۳ کاراکتر باشد")
        .max(20, "نام کامل باید حداکثر ۲۰ کاراکتر باشد"),

    username: yup.string()
        .required("نام کاربری الزامی است")
        .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
        .max(20, "نام کاربری باید حداکثر ۲۰ کاراکتر باشد")
        .matches(/^[a-zA-Z0-9_]+$/, "نام کاربری فقط می‌تواند شامل حروف، اعداد و زیرخط باشد"),

    email: yup.string()
        .required("ایمیل الزامی است")
        .email("ایمیل معتبر نیست")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "فرمت ایمیل نامعتبر است"),

    phone: yup.string()
        .required("شماره موبایل الزامی است")
        .matches(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد"),

    password: yup.string()
        .required("رمز عبور الزامی است")
        .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
        .max(20, "رمز عبور باید حداکثر ۲۰ کاراکتر باشد"),
});

export const requestOTPSchema = yup.object().shape({
    identifier: yup.string()
        .required("ایمیل یا شماره موبایل الزامی است")
        .test("is-valid-identifier", "ایمیل یا شماره موبایل معتبر نیست", function (value) {
            if (!value) return false;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^09\d{9}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
});

export const verifyOTPSchema = yup.object().shape({
    identifier: yup.string()
        .required("ایمیل یا شماره موبایل الزامی است")
        .test("is-valid-identifier", "ایمیل یا شماره موبایل معتبر نیست", function (value) {
            if (!value) return false;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^09\d{9}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
    code: yup.string()
        .required("کد تایید الزامی است")
        .matches(/^\d{6}$/, "کد تایید باید ۶ رقم باشد"),
});

export const setPasswordSchema = yup.object().shape({
    password: yup.string()
        .required("رمز عبور الزامی است")
        .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
        .max(20, "رمز عبور باید حداکثر ۲۰ کاراکتر باشد"),
    confirmPassword: yup.string()
        .required("تکرار رمز عبور الزامی است")
        .oneOf([yup.ref('password')], "رمز عبور و تکرار آن مطابقت ندارند"),
});

export const userSchema = yup.object().shape({
    fullname: yup
        .string()
        .trim()
        .min(3, "نام باید حداقل ۳ کاراکتر باشد")
        .max(20, "نام حداکثر ۲۰ کاراکتر")
        .nullable()
        .optional(),
    username: yup
        .string()
        .trim()
        .lowercase()
        .min(3, "یوزرنیم حداقل ۳ کاراکتر")
        .max(20, "یوزرنیم حداکثر ۲۰ کاراکتر")
        .matches(
            /^[a-z0-9._]+$/,
            "یوزرنیم فقط حروف کوچک، عدد، نقطه و خط زیر"
        )
        .nullable()
        .optional(),
    bio: yup.string().trim().max(200).nullable().optional(),
    city: yup.string().trim().max(50).nullable().optional(),
    dateOfBirth: yup.string().nullable().optional(),
    email: yup
        .string()
        .email("ایمیل معتبر نیست")
        .nullable()
        .optional(),
    phone: yup
        .string()
        .matches(/^09\d{9}$/, "شماره موبایل باید به فرمت 09XXXXXXXXX باشد")
        .nullable()
        .optional(),
    website: yup
        .string()
        .trim()
        .url("آدرس وب‌سایت معتبر نیست")
        .nullable()
        .optional(),
    socialLinks: yup
        .object({
            instagram: yup.string().trim().nullable().optional(),
            twitter: yup.string().trim().nullable().optional(),
            telegram: yup.string().trim().nullable().optional(),
            linkedin: yup.string().trim().nullable().optional(),
        })
        .nullable()
        .optional(),
});