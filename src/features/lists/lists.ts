import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { List } from "@/types/list";
import { Pagination } from "@/types/pagination";

export interface ListState {
    lists: List[];
    selectedList: List | null;
    pagination: Pagination | null;
    isLoading: boolean;
    errors: string | null;
    successMessage: string | null;
};

const initialState: ListState = {
    lists: [],
    selectedList: null,
    pagination: null,
    isLoading: false,
    errors: null,
    successMessage: null
};

export const fetchLists = createAsyncThunk("lists/fetchLists", async (params: { active?: boolean, featured?: boolean } = {}, { rejectWithValue }) => {
    try {
        const query = new URLSearchParams();

        if (params.active !== undefined) query.append("active", String(params.active));
        if (params.featured !== undefined) query.append("featured", String(params.featured));

        const response = await axios.get(`/api/lists?=${query.toString()}`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const fetchListById = createAsyncThunk("lists/fetchListById", async (param: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/lists/${param}`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const createList = createAsyncThunk("lists/createList", async (formData: FormData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/lists", formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const updatedList = createAsyncThunk("lists/updatedList", async ({ _id, formData }: { _id: string, formData: FormData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/lists/${_id}`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const deleteList = createAsyncThunk("lists/deletedList", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/lists/${_id}`, { withCredentials: true });
        return { ...response.data, _id };
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const addArticleToList = createAsyncThunk("lists/addArticleToList", async ({ listId, articleId, order }: { listId: string, articleId: string, order?: number }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/lists/${listId}/articles`, { articleId, order }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const reorderListArticles = createAsyncThunk("lists/reorderListArticles", async ({ listId, orders }: { listId: string; orders: { articleId: string; order: number }[] }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/lists/${listId}/articles`, { orders }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const removeArticleFromList = createAsyncThunk("lists/removeArticleFromList", async ({ listId, articleId }: { listId: string, articleId: string }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/lists/${listId}/articles/${articleId}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});


const listsSlice = createSlice({
    name: "listsSlice",
    initialState,
    reducers: {
        clearListsError: (state) => {
            state.errors = null;
        },
        clearListsSuccess: (state) => {
            state.successMessage = null;
        },
        clearSelectedArticle: (state) => {
            state.selectedList = null;
        },
        setSelectedList: (state, action: PayloadAction<List | null>) => {
            state.selectedList = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLists.pending, (state) => {
                state.isLoading = true;
                state.errors = null
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.isLoading = false;
                state.lists = action.payload.data || [];
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })

            .addCase(fetchListById.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(fetchListById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.lists = action.payload.data;
            })
            .addCase(fetchListById.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(createList.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(createList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                state.lists.unshift(action.payload.data)
            })
            .addCase(createList.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })

            .addCase(updatedList.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(updatedList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                const updated = action.payload.data;

                if (updated) {
                    const index = state.lists.findIndex((list) => list._id === updated._id);
                    if (index !== -1) state.lists[index] = updated;
                    if (state.selectedList?._id === updated._id) {
                        state.selectedList = updated
                    }
                }
            })
            .addCase(updatedList.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })
            .addCase(deleteList.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                state.lists = state.lists.filter((list) => list._id !== action.payload._id);
                if (state.selectedList?._id === action.payload._id) {
                    state.selectedList = null
                }
            })
            .addCase(deleteList.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })
            .addCase(addArticleToList.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(addArticleToList.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedList = action.payload.data;
                if (updatedList) {
                    const index = state.lists.findIndex((list) => list._id === updatedList._id);
                    if (index !== -1) state.lists[index] = updatedList;
                    if (state.selectedList?._id === updatedList._id) {
                        state.selectedList = updatedList
                    }
                }
            })
            .addCase(addArticleToList.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(removeArticleFromList.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(removeArticleFromList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.lists = state.lists.filter((list) => list._id !== action.payload._id);
                if (state.selectedList?._id === action.payload._id) {
                    state.selectedList = null
                }
            })
            .addCase(removeArticleFromList.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(reorderListArticles.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(reorderListArticles.fulfilled, (state, action) => {
                const updatedList = action.payload.data;
                if (updatedList) {
                    const index = state.lists.findIndex((l) => l._id === updatedList._id);
                    if (index !== -1) state.lists[index] = updatedList;
                    if (state.selectedList?._id === updatedList._id) {
                        state.selectedList = updatedList;
                    }
                }
            })
            .addCase(reorderListArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
    },
});

export const { clearListsError, clearListsSuccess, clearSelectedArticle, setSelectedList } = listsSlice.actions;
export default listsSlice.reducer;