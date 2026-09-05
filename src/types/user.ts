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
    role?: 'کاربر' | 'مدیر' | 'نویسنده' | 'پشتیبانی';
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