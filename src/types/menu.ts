export interface Menu {
    _id: string;
    name: string;
    slug: string;
    parentId?: string | null;
    children: [
        {
            _id: string;
            name: string;
            slug: string;
            parentId: string;
            icon?: string | null;
            children: [];
            createdAt: string;
            updatedAt: string
        }
    ];
    icon?: string | null;
    createdAt: string;
    updatedAt: string
}