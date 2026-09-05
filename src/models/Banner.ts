import { Schema, Document, models, model } from "mongoose";

export interface IBanner extends Document {
    title: string;
    link: string;
    image: string;
};

const schema: Schema<IBanner> = new Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        required: true,
    },
    link: {
        type: String,
        minlength: 3,
        maxlength: 200,
        trim: true,
        unique: true,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const BannerModel = models.Banner || model<IBanner>("Banner", schema);
export default BannerModel;