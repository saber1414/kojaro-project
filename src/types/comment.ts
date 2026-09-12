export type CommentType = "comment" | "question";
export type CommentStatus = "pending" | "reject" | "approved" | "spam";
export type ReactionType = "like" | "heart" | "laugh" | "think" | "moai" | "dislike";
export type CommentAuthor = {
    _id: string,
    fullname?: string,
    username?: string,
    image?: string,
    role?: string,
};
export interface ReactionCounts {
    like: number;
    heart: number;
    laugh: number;
    think: number;
    moai: number;
    dislike: number;
}

export interface Comment {
    _id: string;
    content: string;
    type: CommentType;
    isSpoiler: boolean;
    status: CommentStatus;
    author: CommentAuthor | string;
    article: string | { _id: string; title?: string; slug?: string };
    parentComment?: string | null;
    replies?: Comment[];
    reactions?: any[];
    reactionCounts: ReactionCounts;
    isEdited: boolean;
    isPinned: boolean;
    isAnswer: boolean;
    isDeleted?: boolean;
    rejectReason?: string | null;
    createdAt: string;
    updatedAt: string;
};