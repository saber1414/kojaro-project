export interface List {
    _id: string,
    title: string,
    slug: string,
    description: string | null,
    coverImage: string | null,
    isActive: boolean,
    isFeatured: boolean,
    order: number,
    articles: string[],
    createdBy: {
        _id: string,
        username: string,
        fullname: string
    },
    createdAt: string,
    updatedAt: string
};