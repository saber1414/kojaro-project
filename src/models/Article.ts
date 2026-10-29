import { Schema, Document, model, models, Types } from "mongoose";

export interface IArticle extends Document {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: string | null;
    coverImagePublicId?: string | null;
    author: Types.ObjectId;
    categories: Types.ObjectId[];
    articleCategory: Types.ObjectId;
    likeCount: number;
    dislikeCount: number;
    comments: Types.ObjectId[];
    tags?: string[];
    status: "draft" | "published" | "archived";
    views: number;
    readingTime?: number;
    metaTitle?: string;
    metaDescription?: string;
    publishedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

const schema: Schema<IArticle> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 200,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    excerpt: {
        type: String,
        trim: true,
        maxlength: 500,
        default: null,
    },
    content: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: null,
    },
    coverImagePublicId: {
        type: String,
        default: null,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    categories: {
        type: [{ type: Schema.Types.ObjectId, ref: "Category" }],
        default: [],
        validate: {
            validator: (v: unknown[]) => Array.isArray(v) && v.length > 0,
            message: "حداقل یک منو الزامی است",
        },
    },
    articleCategory: {
        type: Schema.Types.ObjectId,
        ref: "ArticleCategory",
        required: true
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    dislikeCount: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],
    tags: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft",
    },
    views: {
        type: Number,
        default: 0,
    },
    readingTime: {
        type: Number,
        default: null,
    },
    metaTitle: {
        type: String,
        trim: true,
        maxlength: 70,
        default: null,
    },
    metaDescription: {
        type: String,
        trim: true,
        maxlength: 160,
        default: null,
    },
    publishedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

schema.index({ status: 1, publishedAt: -1 });
schema.index({ categories: 1 });
schema.index({ articleCategory: 1 });
schema.index({ author: 1 });
schema.index({ tags: 1 });
schema.index({ title: "text", excerpt: "text", content: "text" });

const ArticleModle = models.Article || model<IArticle>("Article", schema);
export default ArticleModle;