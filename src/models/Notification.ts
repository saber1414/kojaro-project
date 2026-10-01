import { Schema, Document, Types, models, model } from "mongoose";

export interface INotification extends Document {
    title: string;
    description: string;
    isActive: boolean;
    author: Types.ObjectId;
};

const schema: Schema<INotification> = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 200,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

schema.index({ author: 1 });

const NotificationModel = models.Notification || model<INotification>("Notification", schema);
export default NotificationModel;