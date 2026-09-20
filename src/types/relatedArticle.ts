export interface RelatedArticle {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string | null;
    author?: {
        _id: string;
        fullname?: string;
        username?: string;
        image?: string;
    };
    category?: {
        _id: string;
        name?: string;
        slug?: string;
        icon?: string;
    };
    tags?: string[];
    views?: number;
    readingTime?: number;
    publishedAt?: string | null;
    likeCount?: number;
};