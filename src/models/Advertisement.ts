import { Schema, Document, Types, models, model } from "mongoose";

export interface IAdvertisement extends Document {
    title?: string;
    link: string;
    image: string;
    alt?: string | null;
    advertiserName?: string | null;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    order: number;
    position: "home" | "sidebar" | "header" | "footer" | "article" | "custom";
    clickCount?: number;
    viewCount?: number;
    createdBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

const schema: Schema<IAdvertisement> = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 120
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        trim: true,
        required: true
    },
    alt: {
        type: String,
        trim: true,
        maxlength: 200,
        default: null
    },
    advertiserName: {
        type: String,
        trim: true,
        maxlength: 200,
        default: null
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    position: {
        type: String,
        enum: ["home", "sidebar", "header", "footer", "article", "custom"],
        default: "home"
    },
    clickCount: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, { timestamps: true });

schema.index({ isActive: 1, startDate: 1, endDate: 1 });
schema.index({ order: 1, position: 1, isActive: 1 });

const AdvertisementModel = models.Advertisement || model<IAdvertisement>("Advertisement", schema);
export default AdvertisementModel;