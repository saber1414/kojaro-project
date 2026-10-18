export type UserRole = "user" | "author" | "moderator" | "admin";
export interface User {
    _id: string;
    fullname?: string;
    username?: string;
    image?: string;
    imagePublicId?: string;
    dateOfBirth?: string;
    city?: string;
    password?: string;
    email?: string;
    phone?: string;
    isVerified?: boolean;
    hasPassword?: boolean;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    role?: string;
    lastLogin?: Date;
    bio?: string;
    website?: string;
    socialLinks?: {
        instagram?: string;
        twitter?: string;
        telegram?: string;
        linkedin?: string;
    };
    createdAt: string;
    updatedAt: string;
};

export interface CreateUserByAdminPayload {
    email: string;
    password: string;
    role: UserRole;
    fullname?: string;
    username?: string;
    phone?: string;
}