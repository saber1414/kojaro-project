import * as yup from "yup";

export const articleSchema = yup.object().shape({
    title: yup
        .string()
        .required("عنوان مقاله الزامی است")
        .min(5, "عنوان باید حداقل ۵ کاراکتر باشد")
        .max(200, "عنوان حداکثر ۲۰۰ کاراکتر")
        .trim(),

    slug: yup
        .string()
        .required("slug الزامی است")
        .matches(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "فقط حروف کوچک انگلیسی، عدد و خط تیره مجاز است"
        )
        .max(220)
        .trim()
        .lowercase(),

    excerpt: yup
        .string()
        .max(500, "خلاصه حداکثر ۵۰۰ کاراکتر")
        .nullable()
        .optional(),

    content: yup
        .string()
        .required("محتوای مقاله الزامی است")
        .min(50, "محتوا باید حداقل ۵۰ کاراکتر باشد"),

    category: yup
        .string()
        .required("دسته‌بندی الزامی است")
        .matches(/^[0-9a-fA-F]{24}$/, "شناسه دسته‌بندی نامعتبر است"),

    tags: yup
        .array()
        .of(yup.string().trim().max(30))
        .max(15, "حداکثر ۱۵ تگ مجاز است")
        .optional(),

    status: yup
        .string()
        .oneOf(["draft", "published", "archived"], "وضعیت نامعتبر است")
        .default("draft"),

    isFeatured: yup.boolean().default(false),

    metaTitle: yup
        .string()
        .max(70, "metaTitle حداکثر ۷۰ کاراکتر")
        .nullable()
        .optional(),

    metaDescription: yup
        .string()
        .max(160, "metaDescription حداکثر ۱۶۰ کاراکتر")
        .nullable()
        .optional(),

    coverImage: yup.string().nullable().optional(),
});

export const updateArticleSchema = articleSchema.partial();