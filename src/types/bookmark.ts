export interface Bookmark {
    _id: string,
    articles?: [
        {
            _id?: string,
            title?: string,
            slug?: string
        }
    ],
    user?: {
        _id?: string,
        username?: string,
        image?: string,
        fullname?: string
    },
    note?: string,
    createdAt?: string,
    updatedAt?: string,
    articlesCount?: number
};