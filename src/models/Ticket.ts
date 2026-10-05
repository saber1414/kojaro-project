import { Schema, Document, Types, models, model } from "mongoose";

export type TicketStatus = "open" | "in_progress" | "answered" | "closed" | "rejected";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory = "technical" | "content" | "account" | "payment" | "other";

export interface ITicketReply {
    sender: Types.ObjectId
    message: string;
    attachments?: string[];
    isInternal?: boolean;
    createdAt: Date;
};

export interface ITicket extends Document {
    subject: string;
    message: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: TicketCategory;
    createdBy: Types.ObjectId;
    assignedTo?: Types.ObjectId | null;
    replies: ITicketReply[];
    attachments?: string[];
    lastReplyAt?: Date | null;
    closedAt?: Date | null;
    closedBy?: Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date
};

const replaySchema: Schema<ITicketReply> = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        trim: true,
        required: true
    },
    attachments: {
        type: [String],
        default: []
    },
    isInternal: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { _id: true });

const schema: Schema<ITicket> = new Schema({
    subject: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 300,
        required: true
    },
    message: {
        type: String,
        trim: true,
        maxlength: 6000,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "in_progress", "answered", "closed", "rejected"],
        default: "open",
        index: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium",
        index: true
    },
    category: {
        type: String,
        enum: ["technical", "content", "account", "payment", "other"],
        default: "other",
        index: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
        index: true
    },
    replies: {
        type: [replaySchema],
        default: []
    },
    attachments: {
        type: [String],
        default: []
    },
    lastReplyAt: {
        type: Date,
        default: null
    },
    closedAt: {
        type: Date,
        default: null
    },
    closedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, { timestamps: true });

schema.index({ status: 1, createdAt: -1 });
schema.index({ createdBy: 1, status: 1 });
schema.index({ assignedTo: 1, status: 1 });
schema.index({ subject: "text", message: "text" });

const TicketModel = models.Ticket || model<ITicket>("Ticket", schema);
export default TicketModel;