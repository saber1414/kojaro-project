import { Schema, Document, model, models } from "mongoose";

export interface IArticleCategory extends Document {
    name: string;
    slug: string;
};

const schema: Schema<IArticleCategory> = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 200,
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });

const ArticleCategoryModel = models.ArticleCategory || model("ArticleCategory", schema);
export default ArticleCategoryModel;