import * as yup from "yup";

export const articleReactionSchema = yup.object().shape({
    type: yup
        .string()
        .oneOf(["like", "dislike"], "نوع واکنش فقط like یا dislike است")
        .required("نوع واکنش الزامی است"),
});

export const articleReactionWithArticleSchema = yup.object().shape({
    articleId: yup
        .string()
        .required("شناسه مقاله الزامی است")
        .matches(/^[0-9a-fA-F]{24}$/, "شناسه مقاله نامعتبر است"),
    type: yup
        .string()
        .oneOf(["like", "dislike"], "نوع واکنش فقط like یا dislike است")
        .required("نوع واکنش الزامی است"),
});