import { Schema, Document, Types, models, model } from "mongoose";

export type ArticleReactionType = "like" | "dislike";

export interface IArticleReaction extends Document {
    article: Types.ObjectId;
    user: Types.ObjectId;
    type: ArticleReactionType;
    likeCount?: number;
    dislikeCount?: number;
    createdAt: Date;
    updatedAt: Date;
};

const schema = new Schema<IArticleReaction>({
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: true,
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ["like", "dislike"],
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
}, { timestamps: true });

schema.index({ article: 1, user: 1 }, { unique: true });
schema.index({ article: 1, type: 1 });

const ArticleReactionModel = models.ArticleReaction || model<IArticleReaction>("ArticleReaction", schema);
export default ArticleReactionModel;