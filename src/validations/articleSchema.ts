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
    .transform((v) => (v === "" ? null : v))
    .max(500, "خلاصه حداکثر ۵۰۰ کاراکتر")
    .nullable()
    .optional(),

  content: yup
    .string()
    .required("محتوای مقاله الزامی است")
    .test(
      "min-text",
      "محتوا باید حداقل ۵۰ کاراکتر باشد",
      (value) => {
        if (!value) return false;
        const text = value.replace(/<[^>]*>/g, "").trim();
        return text.length >= 50;
      }
    ),

  categories: yup
    .array()
    .of(yup.string().required())
    .min(1, "حداقل یک منو الزامی است")
    .required("انتخاب منو الزامی است"),

  articleCategory: yup
    .string()
    .required("دسته‌بندی مقاله الزامی است"),

  tags: yup
    .array()
    .of(yup.string().trim().max(30))
    .max(15, "حداکثر ۱۵ تگ مجاز است")
    .optional(),

  status: yup
    .string()
    .oneOf(["draft", "published", "archived"], "وضعیت نامعتبر است")
    .default("draft"),

  metaTitle: yup
    .string()
    .transform((v) => (v === "" ? null : v))
    .max(70)
    .nullable()
    .optional(),

  metaDescription: yup
    .string()
    .transform((v) => (v === "" ? null : v))
    .max(160)
    .nullable()
    .optional(),

  coverImage: yup.string().nullable().optional(),
});

export const updateArticleSchema = articleSchema.partial();