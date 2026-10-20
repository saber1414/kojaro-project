export interface ArticleCategories {
    _id: string;
    name?: string;
    slug?: string;
    createdAt?: string;
    updatedAt?: string
};

export type CreateArticleCategoryPayload = {
    name: string;
    slug: string;
};