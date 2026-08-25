import * as yup from "yup";

export const categorySchema = yup.object().shape({
    name: yup
        .string()
        .required("نام دسته‌بندی الزامی است")
        .min(2, "حداقل ۲ کاراکتر")
        .max(100)
        .trim(),
    slug: yup
        .string()
        .required("slug الزامی است")
        .matches(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "فقط حروف کوچک، عدد و خط تیره مجاز است"
        )
        .max(120)
        .trim()
        .lowercase(),
    icon: yup
        .string()
        .nullable()
        .optional(),
});