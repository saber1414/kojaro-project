import { Schema, Document, Types, models, model } from "mongoose";

export interface IBookmark extends Document {
    note: string,
    articles?: Types.ObjectId[];
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

const schema: Schema<IBookmark> = new Schema({
    note: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 200,
        required: true
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: "Article",
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
}, { timestamps: true });

schema.index({ user: 1, note: 1 }, { unique: true });
schema.index({ user: 1, articles: 1 });

const BookmarkModel = models.Bookmark || model("Bookmark", schema);
export default BookmarkModel;