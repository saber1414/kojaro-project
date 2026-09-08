export interface Advertisement {
    _id: string;
    title: string;
    image: string;
    link: string;
    alt: string;
    advertiserName: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    order: number;
    position: string;
    clickCount: number;
    viewCount: number;
    createdBy: {
        _id: string;
        username: string;
        image: string;
        fullname: string
    };
    createdAt: string;
    updatedAt: string;
};