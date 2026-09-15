export type FollowTargetType = "author" | "articleCategory";

export interface FollowTargetAuthor {
    _id: string;
    fullname?: string;
    username?: string;
    image?: string;
    role?: string;
    bio?: string;
};

export interface FollowTargetCategory {
    _id: string;
    name: string;
    slug: string;
    icon?: string;
};

export interface FollowItem {
    _id: string;
    targetType: FollowTargetType;
    targetId: string;
    target: FollowTargetAuthor | FollowTargetCategory | null;
    createdAt: string;
};

export interface FeedArticle {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    author: FollowTargetAuthor | string;
    category: FollowTargetCategory | string;
    publishedAt?: string;
    views?: number;
    readingTime?: number;
};