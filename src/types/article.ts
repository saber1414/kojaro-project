export interface Article {
    _id?: string,
    title?: string,
    slug?: string,
    excerpt?: string,
    content?: string,
    coverImage?: string,
    coverImagePublicId?: string | null,
    author?: {
        _id: string,
        username: string,
        image: string,
        fullname: string
    },
    category?: {
        _id: string,
        name: string,
        slug: string,
        icon: string | null
    },
    tags?: string[],
    status?: "draft" | "published" | "archived",
    isFeatured?: boolean,
    views?: number,
    readingTime?: number,
    metaTitle?: string | null,
    metaDescription?: string | null,
    publishedAt?: string | null,
    createdAt?: string,
    updatedAt?: string
};