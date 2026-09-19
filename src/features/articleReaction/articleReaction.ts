import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ArticleReactionData } from "@/types/Reaction";

export interface ArticleReactionsState {
    byArticleId: Record<string, ArticleReactionData>;
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
};

const initialState: ArticleReactionsState = {
    byArticleId: {},
    isLoading: false,
    error: null,
    successMessage: null,
};

export const fetchArticleReaction = createAsyncThunk("articleReactions/fetchArticleReaction", async (_id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/articles/${_id}/reaction`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const reactionToArticle = createAsyncThunk("articleReactions/reactionToArticle", async (
    { _id, type }: { _id: string, type: ArticleReactionData },
    { rejectWithValue }
) => {
    try {
        const response = await axios.post(`/api/articles/${_id}/reaction`, { type }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});


const articleReactionsSlice = createSlice({
    name: "articleReaction",
    initialState,
    reducers: {
        clearArticleReactionError: (state) => {
            state.error = null;
        },
        clearArticleReactionSuccess: (state) => {
            state.successMessage = null;
        },
        setArticleReactionFromArticle: (state, action: PayloadAction<any>) => {
            const { _id, userReaction, likeCount, dislikeCount } = action.payload;
            state.byArticleId[_id] = {
                userReaction, likeCount, dislikeCount
            }
        },
        clearArticleReaction: (state, action: PayloadAction<string>) => {
            delete state.byArticleId[action.payload];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticleReaction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchArticleReaction.fulfilled, (state, action) => {
                state.isLoading = false;
                const { _id, data } = action.payload;

                state.byArticleId[_id] = {
                    userReaction: data.userReaction ?? null,
                    likeCount: data.likeCount ?? 0,
                    dislikeCount: data.dislikeCount ?? 0,
                }
            })
            .addCase(fetchArticleReaction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
            .addCase(reactionToArticle.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(reactionToArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;

                const { _id, data } = action.payload;

                state.byArticleId[_id] = {
                    userReaction: data.userReaction ?? null,
                    likeCount: data.likeCount ?? 0,
                    dislikeCount: data.dislikeCount ?? 0
                }
            })
            .addCase(reactionToArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
});

export const { clearArticleReaction, clearArticleReactionError, clearArticleReactionSuccess, setArticleReactionFromArticle } = articleReactionsSlice.actions;
export default articleReactionsSlice.reducer;