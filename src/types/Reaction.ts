export type ArticleReactionType = "like" | "dislike";

export interface ArticleReactionData {
    userReaction: ArticleReactionType | null;
    likeCount: number;
    dislikeCount: number;
};