export interface Category {
    _id?: string;
    name?: string;
    slug?: string;
    parentId?: string | null | undefined;
    icon?: string | null;
    createdAt?: string;
    updatedAt?: string;
};