import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ArticleCategories } from "@/types/articleCategories";
import { Pagination } from "@/types/pagination";

export interface ArticleCategoriesState {
    articleCategories: ArticleCategories[];
    selectedArticleCategories: ArticleCategories | null;
    pagination: Pagination | null;
    isLoading: boolean;
    isUpdated: boolean;
    error: string | null;
    successMessage: string | null;
};

const initialState: ArticleCategoriesState = {
    articleCategories: [],
    selectedArticleCategories: null,
    pagination: null,
    isLoading: false,
    isUpdated: false,
    error: null,
    successMessage: null
};


export const fetchCategories = createAsyncThunk("articleCategories/ fetchCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/articleCategory`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const fetchByArticleCategories = createAsyncThunk("articleCategories/fetchByArticleCategories", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/articleCategory/${_id}`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const createArticleCategories = createAsyncThunk("articleCategories/createArticleCategories", async (
    data: ArticleCategories,
    { rejectWithValue }
) => {
    try {
        const response = await axios.post(`/api/articleCategory`, { data }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const editArticleCategories = createAsyncThunk("articleCategories/editArticleCategories", async (
    { _id, data }: { _id: string, data: ArticleCategories },
    { rejectWithValue }
) => {
    try {
        const response = await axios.put(`/api/articleCategory/${_id}`, { data }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const deletedArticleCategories = createAsyncThunk("articleCategories/deletedArticleCategories", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/articleCategory/${_id}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

const articleCategoriesSlice = createSlice({
    name: "articleCategories",
    initialState,
    reducers: {
        clearCategoriesError: (state) => {
            state.error = null
        },
        clearCategorySuccess: (state) => {
            state.successMessage = null
        },
        clearSelectedCategories: (state) => {
            state.selectedArticleCategories = null
        },
        setSelectCategorise: (state, action: PayloadAction<ArticleCategories | null>) => {
            state.selectedArticleCategories = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pagination = action.payload.data.pagination || null;
                state.articleCategories = action.payload.data?.articleCategories || [];
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchByArticleCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchByArticleCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articleCategories = action.payload.data?.articleCategories || null;
            })
            .addCase(fetchByArticleCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(createArticleCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createArticleCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                if (action.payload.data) {
                    state.articleCategories.unshift(action.payload.data);
                    if (state.pagination) state.pagination.total += 1
                }
            })
            .addCase(createArticleCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(editArticleCategories.pending, (state) => {
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(editArticleCategories.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload.data.message;
                const updated = action.payload.data;
                if (updated) {
                    const index = state.articleCategories.findIndex((category) => category._id === updated._id);
                    if (index !== -1) state.articleCategories[index] = updated;
                    if (state.selectedArticleCategories?._id === updated._id) {
                        state.selectedArticleCategories = updated
                    }
                }
            })
            .addCase(editArticleCategories.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string;
            })
            .addCase(deletedArticleCategories.pending, (state) => {
                state.isUpdated = true;
                state.error = null
            })
            .addCase(deletedArticleCategories.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload.message;
                state.articleCategories.filter((category) => category._id !== action.payload._id);
                if (state.selectedArticleCategories?._id === action.payload._id) {
                    state.selectedArticleCategories = null
                };
                if (state.pagination) {
                    state.pagination.total = Math.max(0, state.pagination.total - 1)
                }
            })
            .addCase(deletedArticleCategories.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string;
            })
    },
});

export const { clearCategoriesError, clearCategorySuccess, clearSelectedCategories, setSelectCategorise } = articleCategoriesSlice.actions;
export default articleCategoriesSlice.reducer;