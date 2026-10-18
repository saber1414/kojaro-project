import * as yup from "yup";

export const createUserByAdminSchema = yup.object({
    email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
    password: yup
        .string()
        .min(6, "رمز حداقل ۶ کاراکتر")
        .required("رمز عبور الزامی است"),
    fullname: yup.string().trim().max(100).nullable(),
    username: yup
        .string()
        .trim()
        .min(3)
        .max(30)
        .matches(/^[a-zA-Z0-9._]+$/, "فقط حروف، عدد، نقطه و خط زیر")
        .nullable(),
    phone: yup
        .string()
        .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
        .nullable(),
    role: yup
        .string()
        .oneOf(["user", "author", "moderator", "admin"], "نقش نامعتبر است")
        .required("نقش الزامی است"),
});