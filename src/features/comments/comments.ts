import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CommentStatus, CommentType, Comment, ReactionType } from "@/types/comment";
import { Pagination } from "@/types/pagination";

export interface CommentState {
    articleComments: Comment[];
    articlePagination: Pagination | null;
    allComments: Comment[];
    allPagination: Pagination | null;
    selectedComment: Comment | null;
    isLoading: boolean;
    isUpdating: boolean;
    errors: string | null;
    successMessage: string | null;
};

const initialState: CommentState = {
    articleComments: [],
    articlePagination: null,
    allComments: [],
    allPagination: null,
    selectedComment: null,
    isLoading: false,
    isUpdating: false,
    errors: null,
    successMessage: null
};

export const fetchArticleComments = createAsyncThunk("comments/fetchArticleComments", async ({ articleId, page = 1, limit = 20 }: { articleId: string, page?: number, limit?: number }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/comments/${articleId}/comments?=${page}&limit=${limit}`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const fetchAllComments = createAsyncThunk("comments/fetchAllComments", async (
    params: {
        articleId?: string;
        authorId?: string;
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
        onlyRoot?: boolean;
        sort?: "newest" | "oldest";
    } = {},
    { rejectWithValue }
) => {
    try {
        const query = new URLSearchParams();
        if (params.page) query.append("page", String(params.page));
        if (params.limit) query.append("limit", String(params.limit));
        if (params.search) query.append("search", params.search);
        if (params.status) query.append("status", params.status);
        if (params.onlyRoot) query.append("onluRoot", "true");
        if (params.sort) query.append("sort", params.sort);
        if (params.articleId) query.append("articleId", params.articleId);
        if (params.authorId) query.append("authorId", params.authorId);

        const response = await axios.get(`/api/comments?${query.toString()}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const createComment = createAsyncThunk("comments/createComment", async (
    data: {
        content: string;
        articleId: string;
        type?: CommentType;
        isSpoiler?: boolean;
        attachments?: { type: "image" | "link"; url: string }[];
        userMentions?: string[];
    },
    { rejectWithValue }
) => {
    try {
        const response = await axios.post("/api/comments", data, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const updateComment = createAsyncThunk("comments/updateComment", async (
    { _id, data }: {
        _id: string,
        data: {
            content?: string;
            isSpoiler?: boolean;
            userMentions?: string;
            attachments?: { type: "image" | "link"; url: string }[];
        }
    },
    { rejectWithValue }
) => {
    try {
        const response = await axios.put(`/api/comments/${_id}`, data, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const deleteComment = createAsyncThunk("comments/deleteComment", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/comments/${_id}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const moderateComment = createAsyncThunk("comments/moderateComment", async ({ _id, status }: { _id: string, status: CommentStatus }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/comments/${_id}`, { status }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const reactionToComment = createAsyncThunk("comments/reactionToComment", async ({ _id, type }: { _id: string, type: ReactionType }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/comments/${_id}/reaction`, { type }, { withCredentials: true });
        return { ...response.data, _id };
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

const updateCommentInList = (list: Comment[], _id: string, updater: (comment: Comment) => Comment): Comment[] => {
    return list.map((comment) => {
        if (comment._id === _id) return updater(comment);
        if (comment.replies?.length) {
            return {
                ...comment,
                replies: updateCommentInList(comment.replies, _id, updater)
            }
        };

        return comment;
    })
};

const removeCommentFromList = (list: Comment[], _id: string): Comment[] => {
    return list
        .filter((comment) => comment._id !== _id)
        .map((comment) => ({
            ...comment,
            replies: comment.replies ? removeCommentFromList(comment.replies, _id) : []
        }))
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        clearCommentsError: (state) => {
            state.errors = null;
        },
        clearCommentsSuccess: (state) => {
            state.successMessage = null;
        },
        clearSelectedComment: (state) => {
            state.selectedComment = null;
        },
        clearArticleComments: (state) => {
            state.articleComments = [],
                state.articlePagination = null
        },
        setSelectedComment: (state, action: PayloadAction<any>) => {
            state.selectedComment = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticleComments.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(fetchArticleComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articleComments = action.payload.data?.comments || [];
                state.allPagination = action.payload.data?.pagination || null;
            })
            .addCase(fetchArticleComments.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })
            .addCase(fetchAllComments.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(fetchAllComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allComments = action.payload.data?.comments || [];
                state.allPagination = action.payload.data.pagination || null;
            })
            .addCase(fetchAllComments.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload?.message;

                const newComment = action.payload.data;
                if (!newComment) return;

                if (newComment.parentComment) {
                    const parentId =
                        typeof newComment.parentComment === "string"
                            ? newComment.parentComment
                            : newComment.parentComment._id;

                    state.articleComments = updateCommentInList(
                        state.articleComments,
                        parentId,
                        (comment) => ({
                            ...comment,
                            replies: [...(comment.replies || []), newComment]
                        })
                    );
                } else if (newComment.status === "approved") {
                    state.articleComments.unshift(newComment)
                };

                state.allComments.unshift(newComment)
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(updateComment.pending, (state) => {
                state.isUpdating = true;
                state.errors = null;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.isUpdating = false;
                state.successMessage = action.payload.message;

                const updated = action.payload.data;
                if (!updated) return;

                state.articleComments = updateCommentInList(
                    state.articleComments,
                    updated._id,
                    () => updated
                );
                state.allComments =
                    state.allComments.map((comment) => comment._id === updated._id ? updated : comment);

                if (state.selectedComment?._id === updated._id) {
                    state.selectedComment = updated;
                }
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.isUpdating = false;
                state.errors = action.payload as string
            })
            .addCase(deleteComment.pending, (state, action) => {
                state.isUpdating = true;
                state.errors = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isUpdating = false;
                state.successMessage = action.payload.message;

                const id = action.payload.id;
                state.articleComments = removeCommentFromList(state.articleComments, id);

                state.allComments = state.allComments.filter((comment) => comment._id !== id);
                if (state.selectedComment?._id === id) {
                    state.selectedComment = null
                }
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isUpdating = false;
                state.errors = action.payload as string
            })
            .addCase(moderateComment.pending, (state) => {
                state.isUpdating = true;
                state.errors = null;
            })
            .addCase(moderateComment.fulfilled, (state, action) => {
                state.isUpdating = false;
                state.successMessage = action.payload.message;

                const updated = action.payload.data;
                if (!updated) return;

                state.allComments = state.allComments.map((comment) => comment._id === updated._id ? { ...comment, ...updated } : comment);

                if (updated.status === "approved") {
                    state.articleComments = updateCommentInList(
                        state.articleComments,
                        updated._id,
                        (comment) => ({ ...comment, ...updated._id })
                    )
                } else {
                    state.articleComments = removeCommentFromList(
                        state.articleComments,
                        updated._id
                    )
                }
            })
            .addCase(moderateComment.rejected, (state, action) => {
                state.isUpdating = false;
                state.errors = action.payload as string
            })
            .addCase(reactionToComment.pending, (state) => {
                state.isUpdating = true;
                state.errors = null
            })
            .addCase(reactionToComment.fulfilled, (state, action) => {
                state.isUpdating = false;

                const id = action.payload.data;
                const { reactionCounts, reactions } = action.payload.data || {};

                const updater = (comment: Comment) => ({
                    ...comment,
                    reactionCounts: reactionCounts || comment.reactionCounts,
                    reactions: reactions || comment.reactions
                });

                state.articleComments = updateCommentInList(
                    state.articleComments,
                    id,
                    updater
                );
                state.allComments = state.allComments.map((comment) => comment._id === id ? updater(comment) : comment)
            })
            .addCase(reactionToComment.rejected, (state, action) => {
                state.isUpdating = false;
                state.errors = action.payload as string
            })
    },
});

export const { clearArticleComments, clearCommentsError, clearCommentsSuccess, clearSelectedComment, setSelectedComment } = commentsSlice.actions;
export default commentsSlice.reducer;