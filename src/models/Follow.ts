import { Schema, Document, model, models, Types } from "mongoose";

export type FollowTargetType = "author" | "articleCategory";

export interface IFollow extends Document {
    user: Types.ObjectId;
    targetType: FollowTargetType;
    targetId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema<IFollow>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        targetType: {
            type: String,
            enum: ["author", "articleCategory"],
            required: true,
        },
        targetId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

schema.index({ user: 1, targetType: 1, targetId: 1 }, { unique: true });
schema.index({ user: 1, targetType: 1 });
schema.index({ targetType: 1, targetId: 1 });

const FollowModel = models.Follow || model<IFollow>("Follow", schema);
export default FollowModel;