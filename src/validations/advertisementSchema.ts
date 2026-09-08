import * as yup from "yup";

export const adSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .required("عنوان تبلیغ الزامی است")
        .min(3, "عنوان حداقل ۳ کاراکتر باشد")
        .max(200),
    image: yup
        .string()
        .trim()
        .required("عکس تبلیغ الزامی می‌باشد"),
    link: yup
        .string()
        .trim()
        .required("لینک تبلیغ الزامی می‌باشد")
        .url("لینک معتبر نیست"),
    alt: yup
        .string()
        .trim()
        .max(200)
        .nullable()
        .optional(),
    advertiserName: yup
        .string()
        .trim()
        .max(200)
        .nullable()
        .optional(),
    startDate: yup
        .date()
        .typeError("تاریخ شروع معتبر نیست")
        .required("تاریخ شروع الزامی است"),
    endDate: yup
        .date()
        .typeError("تاریخ پایان معتبر نیست")
        .required("تاریخ پایان الزامی است")
        .min(
            yup.ref("startDate"),
            "تاریخ پایان باید بعد از تاریخ شروع باشد"
        ),
    isActive: yup.boolean().optional(),
    order: yup
        .number()
        .integer()
        .min(0)
        .optional(),
    position: yup
        .string()
        .oneOf(["home", "sidebar", "header", "footer", "article", "custom"])
        .optional(),
});

export const updatedAdSchema = adSchema.partial();