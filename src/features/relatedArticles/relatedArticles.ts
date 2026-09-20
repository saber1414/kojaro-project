import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RelatedArticle } from "@/types/relatedArticle";
import axios, { AxiosError } from "axios";

export interface RelatedArticlesState {
    byArticleKey: Record<string, RelatedArticle[]>;
    isLoading: boolean;
    error: string | null;
};

const initialState: RelatedArticlesState = {
    byArticleKey: {},
    isLoading: false,
    error: null
};

export const fetchRelatedArticles = createAsyncThunk("relatedArticles/fetchRelatedArticles", async (
    { _id, limit = 6 }: { _id: string, limit: number },
    { rejectWithValue }
) => {
    try {
        const response = await axios.get(`/api/articles/${_id}/related?limit=${limit}`);
        return {
            _id,
            articles: (response.data?.data || []) as RelatedArticle[]
        }
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.request.data?.message)
    }
});

const relatedArticlesSlice = createSlice({
    name: "relatedArticles",
    initialState,
    reducers: {
        clearRelatedError: (state) => {
            state.error = null
        },
        clearRelatedArticles: (state, action: PayloadAction<string>) => {
            delete state.byArticleKey[action.payload]
        },
        clearAllRelatedArticles: (state) => {
            state.byArticleKey = {}
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRelatedArticles.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchRelatedArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                const { _id, articles } = action.payload;

                state.byArticleKey[_id] = articles
            })
            .addCase(fetchRelatedArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
});

export const { clearAllRelatedArticles, clearRelatedArticles, clearRelatedError } = relatedArticlesSlice.actions;
export default relatedArticlesSlice.reducer;

export const selectRelatedArticles = (
    state: { relatedArticles: RelatedArticlesState },
    _id: string
): RelatedArticle[] => state.relatedArticles.byArticleKey[_id];