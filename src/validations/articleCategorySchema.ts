import * as yup from "yup";

export const articleCategorySchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, "حداقل مجاز 3 کاراکتر می باشد")
        .max(200, "حداکثر 200 کاراکتر می باشد")
        .required("نام دسته بندی الزامی است"),
    slug: yup
        .string()
        .trim()
        .required("مسیر دسته بندی الزامی می باشد")
});

export const updateArticleCategory = articleCategorySchema.optional();