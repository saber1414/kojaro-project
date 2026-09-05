import { Schema, Document, Types, model, models } from "mongoose";

export interface IListItem {
    article: Types.ObjectId;
    order: number;
};

export interface IList extends Document {
    title: string;
    slug: string;
    description?: string;
    coverImage?: string;
    isActive: boolean;
    isFeatured: boolean;
    order: number;
    articles: IListItem[];
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

const listSchema: Schema<IListItem> = new Schema({
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { _id: false });

const schema: Schema<IList> = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 200,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
        default: null
    },
    coverImage: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    articles: {
        type: [listSchema],
        default: []
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

schema.index({ slug: 1 });
schema.index({ isActive: 1, order: 1 });
schema.index({ isFeatured: 1 });

const ListModel = models.List || model<IList>("List", schema);
export default ListModel;