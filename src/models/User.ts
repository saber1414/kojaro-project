// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    fullname?: string;
    username?: string;
    image?: string;
    imagePublicId?: string;
    dateOfBirth?: string;
    city?: string;
    password?: string;
    email?: string;
    phone?: string;
    isVerified: boolean;
    hasPassword: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: 'user' | 'admin' | 'moderator' | 'author';
    lastLogin?: Date;
    bio?: string;
    website?: string;
    socialLinks?: {
        instagram?: string;
        twitter?: string;
        telegram?: string;
        linkedin?: string;
    };
};

const schema: Schema<IUser> = new Schema({
    fullname: { type: String, minlength: 3, maxlength: 20, trim: true },
    username: { 
        type: String, 
        minlength: 3, 
        maxlength: 20,
        trim: true,
        lowercase: true,
        unique: true,  
        sparse: true 
    },
    image: { type: String, default: null },
    imagePublicId: { type: String, default: null },
    dateOfBirth: { type: String },
    city: { type: String, trim: true },
    password: { type: String, minlength: 6, maxlength: 20, select: false },
    email: { 
        type: String, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        unique: true,  
        sparse: true,
        lowercase: true,
        trim: true 
    },
    phone: { 
        type: String, 
        match: /^09\d{9}$/, 
        unique: true,  
        sparse: true 
    },
    isVerified: { type: Boolean, default: false },
    hasPassword: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator', 'author'],
        default: 'user'
    },
    lastLogin: { type: Date, default: null },
    bio: { type: String, maxlength: 200, default: null },
    website: {
        type: String,
        match: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        default: null
    },
    socialLinks: {
        instagram: { type: String, default: null },
        twitter: { type: String, default: null },
        telegram: { type: String, default: null },
        linkedin: { type: String, default: null }
    }
}, { timestamps: true });

schema.index({ role: 1 });
schema.index({ isVerified: 1 });

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", schema);
export default UserModel;