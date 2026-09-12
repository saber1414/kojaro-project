import * as yup from "yup";
import { CommentType, CommentStatus, ReactionType, } from "@/models/Comment";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createCommentSchema = yup.object().shape({
    content: yup
        .string()
        .required("متن دیدگاه الزامی است")
        .trim()
        .min(1, "متن دیدگاه نمی‌تواند خالی باشد")
        .max(5000, "حداکثر ۵۰۰۰ کاراکتر"),

    articleId: yup
        .string()
        .required("شناسه مقاله الزامی است")
        .matches(objectIdRegex, "شناسه مقاله نامعتبر است"),

    parentCommentId: yup
        .string()
        .matches(objectIdRegex, "شناسه دیدگاه والد نامعتبر است")
        .nullable()
        .optional(),

    type: yup
        .string()
        .oneOf(Object.values(CommentType), "نوع دیدگاه نامعتبر است")
        .optional()
        .default(CommentType.COMMENT),

    isSpoiler: yup.boolean().optional().default(false),

    userMentions: yup
        .array()
        .of(
            yup
                .string()
                .matches(objectIdRegex, "شناسه کاربر mention نامعتبر است")
        )
        .optional()
        .default([]),

    attachments: yup
        .array()
        .of(
            yup.object().shape({
                type: yup
                    .string()
                    .oneOf(["image", "link"], "نوع پیوست نامعتبر است")
                    .required(),
                url: yup
                    .string()
                    .required("آدرس پیوست الزامی است")
                    .url("آدرس پیوست معتبر نیست"),
            })
        )
        .max(5, "حداکثر ۵ پیوست مجاز است")
        .optional()
        .default([]),
});

export const updateCommentSchema = yup.object().shape({
    content: yup
        .string()
        .trim()
        .min(1, "متن دیدگاه نمی‌تواند خالی باشد")
        .max(5000, "حداکثر ۵۰۰۰ کاراکتر")
        .optional(),

    isSpoiler: yup.boolean().optional(),

    userMentions: yup
        .array()
        .of(yup
            .string()
            .matches(objectIdRegex, "شناسه کاربر mention نامعتبر است"))
        .optional(),

    attachments: yup
        .array()
        .of(
            yup.object().shape({
                type: yup
                    .string()
                    .oneOf(["image", "link"])
                    .required(),
                url: yup.string().url().required(),
            })
        )
        .max(5)
        .optional(),
});

export const moderateCommentSchema = yup.object().shape({
    status: yup
        .string()
        .oneOf(
            [CommentStatus.APPROVED, CommentStatus.REJECTED, CommentStatus.SPAM],
            "وضعیت نامعتبر است"
        )
        .required("وضعیت الزامی است"),

    rejectReason: yup
        .string()
        .trim()
        .max(500, "دلیل رد حداکثر ۵۰۰ کاراکتر")
        .nullable()
        .when("status", {
            is: CommentStatus.REJECTED,
            then: (schema) => schema.optional(),
            otherwise: (schema) => schema.nullable().optional(),
        }),
});

export const reactionSchema = yup.object().shape({
    type: yup
        .string()
        .oneOf(Object.values(ReactionType), "نوع واکنش نامعتبر است")
        .required("نوع واکنش الزامی است"),
});


export const pinCommentSchema = yup.object().shape({
    isPinned: yup.boolean().required("وضعیت پین الزامی است"),
});

export const markAsAnswerSchema = yup.object().shape({
    isAnswer: yup.boolean().required("وضعیت پاسخ الزامی است"),
});