type AdPosition = "home" | "sidebar" | "header" | "footer" | "article" | "custom";
export interface Advertisement {
    _id: string;
    title: string;
    image: string;
    link?: string;
    alt?: string;
    advertiserName?: string;
    startDate?: string;
    endDate?: string;
    isActive?: boolean;
    order: number;
    position: AdPosition;
    clickCount: number;
    viewCount: number;
    createdBy: {
        _id: string;
        username: string;
        image?: string;
        fullname?: string;
    };
    createdAt?: string;
    updatedAt?: string;
}