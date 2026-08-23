import mongoose, { Schema, Document } from "mongoose";

export interface IOTP extends Document {
    identifier: string;
    code: string;
    type: "email" | "phone";
    expiresAt: Date;
    isUsed: boolean
};

export const schema: Schema<IOTP> = new Schema({
    identifier: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, enum: ["email", "phone"], required: true },
    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false },
}, { timestamps: true });

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTPModel = mongoose.models.OTP || mongoose.model<IOTP>("OTP", schema);
export default OTPModel;