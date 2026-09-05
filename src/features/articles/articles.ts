import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Article } from "@/types/article";
import { Pagination } from "@/types/pagination";

export interface FetchArticlesParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
    author?: string;
    isFeatured?: string;
    sort?: "newest" | "oldest" | "views" | "title";
}

interface ArticleState {
    articles: Article[];
    selectedArticle: Article | null;
    pagination: Pagination | null;
    isLoading: boolean;
    errors: string | null;
    successMessaage: string | null;
};

const initialState: ArticleState = {
    articles: [],
    selectedArticle: null,
    pagination: null,
    isLoading: false,
    errors: null,
    successMessaage: null
};

const fetchArticles = createAsyncThunk("articles/fetchArticles", async (
    params: FetchArticlesParams = {},
    { rejectWithValue }
) => {
    try {
        const query = new URLSearchParams();
        if (params.page) query.append("page", String(params.page));
        if (params.limit) query.append("limit", String(params.limit));
        if (params.search) query.append("search", params.search);
        if (params.category) query.append("category", params.category);
        if (params.status) query.append("status", params.status);
        if (params.author) query.append("author", params.author);
        if (params.isFeatured) query.append("isFeatured", params.isFeatured);
        if (params.sort) query.append("sort", params.sort);

        const response = await axios.get(`/api/articles=?${query.toString()}`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError);
    }
});

const fetchArticle = createAsyncThunk("articles/fetchArticle", async (param: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/articles/${param}`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError);
    }
});

const createArticle = createAsyncThunk("articles/createArticle", async (formData: FormData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/articles", formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError);
    }
});

const updateArticle = createAsyncThunk("articles/updateArticle", async ({ _id, formData }: { _id: string, formData: FormData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/articles/${_id}`, formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError);
    }
});

const deleteArticles = createAsyncThunk("articles/deleteArticles", async (ids: string[], { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/articles/`, {
            data: ids,
            withCredentials: true
        });

        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError);
    }
});

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        clearArticlesError: (state) => {
            state.errors = null;
        },
        clearArticlesSuccess: (state) => {
            state.successMessaage = null;
        },
        clearSelectedArticle: (state) => {
            state.selectedArticle = null;
        },
        setSelectedArticle: (state, action: PayloadAction<Article | null>) => {
            state.selectedArticle = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload.data?.articles || [];
                state.pagination = action.payload.data?.pagination || null
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(fetchArticle.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(fetchArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload.data || null;
            })
            .addCase(fetchArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.selectedArticle = null;
                state.errors = action.payload as string;
            })

            .addCase(createArticle.pending, (state, action) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessaage = action.payload.message;
                if (action.payload.data) {
                    state.articles.unshift(action.payload.data)
                    if (state.pagination) {
                        state.pagination.total += 1
                    }
                };
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(updateArticle.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessaage = action.payload.message;
                const updated = action.payload.data;
                if (updated) {
                    const index = state.articles.findIndex((article) => article._id === updated._id);
                    if (index !== -1) {
                        state.articles[index] = updated
                    }
                    if (state.selectedArticle?._id === updated._id) {
                        state.selectedArticle = updated;
                    }
                }
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(deleteArticles.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(deleteArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessaage = action.payload.message;
                state.articles.filter((article) => article._id !== action.payload._id);
                if (state.selectedArticle?._id === action.payload._id) {
                    state.selectedArticle = null
                };
                if (state.pagination) {
                    state.pagination.total = Math.max(0, state.pagination.total - 1)
                }
            })
            .addCase(deleteArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })
    },
});

export const { clearArticlesError, clearArticlesSuccess, clearSelectedArticle, setSelectedArticle } = articlesSlice.actions;
export default articlesSlice.reducer;