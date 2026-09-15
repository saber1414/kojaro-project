import * as yup from "yup";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const followSchema = yup.object().shape({
    targetType: yup
        .string()
        .oneOf(["author", "articleCategory"], "نوع دنبال‌شونده نامعتبر است")
        .required("نوع الزامی است"),

    targetId: yup
        .string()
        .required("شناسه الزامی است")
        .matches(objectIdRegex, "شناسه نامعتبر است"),
});

export const unfollowSchema = followSchema;