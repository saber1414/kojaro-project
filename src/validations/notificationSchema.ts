import * as yup from "yup";

export const notificationSchema = yup.object().shape({
    title: yup
        .string()
        .min(3, "حداقل مجاز 3 کاراکتر می باشد")
        .max(200, "حداکثر مجاز 200 کاراکتر می باشد")
        .trim()
        .required("عنوان اعلان الزامی می باشد"),
    description: yup
        .string()
        .trim()
        .required("متن اعلان الزامی می باشد")
});

export const updatedNotificationSchema = notificationSchema.partial();