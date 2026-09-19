import * as yup from "yup";

export const bookmarkSchema = yup.object().shape({
    note: yup
        .string()
        .trim()
        .min(3, "حداقل مجاز 3 کاراکتر")
        .max(200, "حداکثر مجاز 200 کاراکتر")
        .required("عنوان بوکمارک الزامی می باشد"),
});

export const updatedBookmarkSchema = bookmarkSchema.partial();