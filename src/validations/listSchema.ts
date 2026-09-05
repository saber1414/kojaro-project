import * as yup from "yup";

export const listSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .min(2)
        .max(200)
        .required("عنوان الزامی می باشد"),
    slug: yup
        .string()
        .trim()
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .lowercase()
        .required("مسیر الزامی می باشد"),
    description: yup
        .string()
        .trim()
        .max(500)
        .nullable()
        .optional(),
    isActive: yup
        .boolean()
        .optional(),
    isFeatured: yup
        .boolean()
        .optional(),
    order: yup
        .number()
        .integer()
        .min(0)
        .optional(),
    coverImage: yup
        .string()
        .nullable()
        .optional()
});

export const updateListSchema = listSchema.partial();

export const addArticleToListSchema = yup.object().shape({
    articleId: yup
        .string()
        .required("شناسه مقاله الزامی است")
        .matches(/^[0-9a-fA-F]{24}$/, "شناسه نامعتبر است"),
    order: yup.number().integer().min(0).optional(),
});