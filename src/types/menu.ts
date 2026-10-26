export interface SubMenu {
    _id: string;
    name: string;
    slug: string;
    parentId: string;
    icon?: string | null;
    children: SubMenu[];
    createdAt: string;
    updatedAt: string;
}

export interface Menu {
    _id: string;
    name: string;
    slug: string;
    parentId?: string | null;
    children?: SubMenu[];
    icon?: string | null;
    createdAt: string;
    updatedAt: string;
}