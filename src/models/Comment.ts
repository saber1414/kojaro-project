import { Types, Document, Schema, models, model } from "mongoose";

export enum CommentType {
    COMMENT = "comment",
    QUESTION = "question",
}

export enum CommentStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    SPAM = "spam",
}

export enum ReactionType {
    LIKE = "like",
    HEART = "heart",
    LAUGH = "laugh",
    THINK = "think",
    MOAI = "moai",
    DISLIKE = "dislike",
}

export interface IReaction {
    type: ReactionType;
    userId: Types.ObjectId;
    createdAt: Date;
}

export interface IAttachment {
    type: "image" | "link";
    url: string;
}

export interface IComment extends Document {
    content: string;
    type: CommentType;
    isSpoiler: boolean;
    status: CommentStatus;
    author: Types.ObjectId;
    article: Types.ObjectId;
    parentComment?: Types.ObjectId | null;
    replies: Types.ObjectId[];
    reactions: IReaction[];
    reactionCounts: {
        like: number;
        heart: number;
        laugh: number;
        think: number;
        moai: number;
        dislike: number;
    };
    isEdited: boolean;
    editedAt?: Date | null;
    approvedBy?: Types.ObjectId | null;
    approvedAt?: Date | null;
    rejectedBy?: Types.ObjectId | null;
    rejectedAt?: Date | null;
    rejectReason?: string | null;
    isPinned: boolean;
    isAnswer: boolean;
    isDeleted: boolean;
    userMentions?: Types.ObjectId[];
    attachments?: IAttachment[];
    createdAt: Date;
    updatedAt: Date;
}

const ReactionSchema = new Schema<IReaction>(
    {
        type: {
            type: String,
            enum: Object.values(ReactionType),
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const AttachmentSchema = new Schema<IAttachment>(
    {
        type: {
            type: String,
            enum: ["image", "link"],
            required: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const CommentSchema = new Schema<IComment>(
    {
        content: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 5000,
        },
        type: {
            type: String,
            enum: Object.values(CommentType),
            default: CommentType.COMMENT,
        },
        isSpoiler: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: Object.values(CommentStatus),
            default: CommentStatus.PENDING,
            index: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        article: {
            type: Schema.Types.ObjectId,
            ref: "Article",
            required: true,
            index: true,
        },
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
            index: true,
        },
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        reactions: {
            type: [ReactionSchema],
            default: [],
        },
        reactionCounts: {
            like: { type: Number, default: 0 },
            heart: { type: Number, default: 0 },
            laugh: { type: Number, default: 0 },
            think: { type: Number, default: 0 },
            moai: { type: Number, default: 0 },
            dislike: { type: Number, default: 0 },
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
        editedAt: {
            type: Date,
            default: null,
        },
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        approvedAt: {
            type: Date,
            default: null,
        },
        rejectedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        rejectedAt: {
            type: Date,
            default: null,
        },
        rejectReason: {
            type: String,
            trim: true,
            maxlength: 500,
            default: null,
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        isAnswer: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
        },
        userMentions: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        attachments: {
            type: [AttachmentSchema],
            default: [],
        },
    },
    { timestamps: true }
);

CommentSchema.index({ article: 1, status: 1, createdAt: -1 });
CommentSchema.index({ article: 1, parentComment: 1, status: 1 });
CommentSchema.index({ author: 1, createdAt: -1 });
CommentSchema.index({ parentComment: 1, createdAt: 1 });
CommentSchema.index({ status: 1, createdAt: -1 });
CommentSchema.index({ isPinned: -1, createdAt: -1 });
CommentSchema.index({ isDeleted: 1, status: 1 });
CommentSchema.index({ "reactions.userId": 1 });

const CommentModel = models.Comment || model<IComment>("Comment", CommentSchema);

export default CommentModel;