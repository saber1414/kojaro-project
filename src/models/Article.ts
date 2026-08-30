import { Schema, Document, model, models, Types } from "mongoose";

export interface IArticle extends Document {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: string | null;
    coverImagePublicId?: string | null;
    author: Types.ObjectId;
    category: Types.ObjectId;
    tags?: string[];
    status: "draft" | "published" | "archived";
    isFeatured: boolean;
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
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft",
    },
    isFeatured: {
        type: Boolean,
        default: false,
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

schema.index({ slug: 1 });
schema.index({ status: 1, published: 1 });
schema.index({ category: 1 });
schema.index({ author: 1 });
schema.index({ isFeatured: 1 });
schema.index({ tags: 1 });
schema.index({ title: "text", excerpt: "text", content: "text" });

const ArticleModle = models.Article || model<IArticle>("Article", schema);
export default ArticleModle;