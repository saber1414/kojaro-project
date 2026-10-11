export type TicketStatus = | "open" | "in_progress" | "answered" | "closed" | "rejected";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory = | "technical" | "content" | "account" | "payment" | "other";

export interface TicketUser {
    _id: string;
    fullname?: string;
    username?: string;
    image?: string;
    role?: string;
};

export interface TicketReply {
    _id?: string;
    sender: TicketUser | string;
    message: string;
    attachments?: string[];
    isInternal?: boolean;
    createdAt: string;
};

export interface Ticket {
    _id: string;
    subject: string;
    message: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: TicketCategory;
    createdBy: {
        _id: string;
        username: string;
        image?: string;
        role?: string;
        fullname?: string;
    };
    assignedTo?: unknown;
    attachments?: string[];
    lastReplyAt?: string | null;
    closedAt?: string | null;
    closedBy?: unknown;
    replies?: unknown[];
    createdAt?: string;
    updatedAt?: string;
}