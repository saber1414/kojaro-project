import * as yup from "yup";

export const bannerSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .min(3, "حداقل 3 کاراکتر")
        .max(100)
        .required("عنوان الزامی می باشد"),
    link: yup
        .string()
        .trim()
        .min(3, "حداقل 3 کاراکتر")
        .max(200)
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .nullable()
        .required("لینک الزامی می باشد"),
    image: yup
        .string()
        .nullable()
        .required("عکس بنر الزامی می باشد")
});

export const updateBannerShcema = bannerSchema.partial();