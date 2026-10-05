import * as yup from "yup";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createTicketSchema = yup.object().shape({
    subject: yup
        .string()
        .trim()
        .min(3, "حداقل ۳ کاراکتر")
        .max(300)
        .required("موضوع الزامی است"),
    message: yup
        .string()
        .trim()
        .min(5, "حداقل ۵ کاراکتر")
        .max(6000)
        .required("متن تیکت الزامی است"),
    priority: yup
        .string()
        .oneOf(["low", "medium", "high", "urgent"])
        .optional(),
    category: yup
        .string()
        .oneOf(["technical", "content", "account", "payment", "other"])
        .optional(),
});

export const replyTicketSchema = yup.object().shape({
    message: yup
        .string()
        .trim()
        .min(1)
        .max(6000)
        .required("متن پاسخ الزامی است"),
    isInternal: yup.boolean().optional(),
});

export const updateTicketStatusSchema = yup.object().shape({
    status: yup
        .string()
        .oneOf(["open", "in_progress", "answered", "closed", "rejected"])
        .required(),
    assignedTo: yup
        .string()
        .matches(objectIdRegex)
        .nullable()
        .optional(),
    priority: yup
        .string()
        .oneOf(["low", "medium", "high", "urgent"])
        .optional(),
});