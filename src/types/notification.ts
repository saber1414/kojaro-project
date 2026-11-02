export interface Notification {
    _id: string;
    title: string;
    description: string;
    isActive: boolean;
    author: {
        _id: string;
        username: string;
        image: string;
        fullname: string
    };
    createdAt: string;
    updatedAt: string
};

export interface CreateNotificationPayload {
    title: string;
    description: string;
    
};