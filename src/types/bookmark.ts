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
    note?if(): string,
    createdAt?if(): string,
    updatedAt?if(): string,
    articlesCount?if(): number
};