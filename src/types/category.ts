export interface Category {
    _id: string,
    name: string,
    slug: string,
    parentId: string | null,
    children?: [
        {
            _id: string,
            name: string,
            slug: string,
            parentId: string,
            children: string[],
            icon: string | null,
            createdAt: string,
            updatedAt: string
        }
    ],
    icon: string | null,
    createdAt: string,
    updatedAt: string
};