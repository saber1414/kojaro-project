import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Bookmark } from "@/types/bookmark";

export interface BookmarkState {
    bookmarks: Bookmark[];
    selectBookmark: Bookmark | null;
    isLoading: boolean;
    isUpdated: boolean;
    successMessage: string | null;
    error: string | null;
};

const initialState: BookmarkState = {
    bookmarks: [],
    selectBookmark: null,
    isLoading: false,
    isUpdated: false,
    successMessage: null,
    error: null
};

export const fetchBookmarks = createAsyncThunk("bookmarks/fetchBookmarks", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/bookmarks", { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const createBookmark = createAsyncThunk("bookarks/createBookmarks", async ({ data }: { data: Bookmark }, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/bookmarks", { data }, { withCredentials: true });
        return response.data
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const updatedBookmark = createAsyncThunk("bookmarks/updatedBookmark", async ({ _id, data }: { _id: string, data: Bookmark }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/bookmarks/${_id}`, { data }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const deletedBookmarks = createAsyncThunk("bookmarks/deletedBookmarks", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/bookmarks/${_id}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

const bookmarkSlice = createSlice({
    name: "bookmarls",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null
        },
        clearSleectedBookmarks: (state) => {
            state.selectBookmark = null
        },
        setSelectBookmarks: (state, action: PayloadAction<Bookmark | null>) => {
            state.selectBookmark = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBookmarks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBookmarks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookmarks = action.payload.data || []
            })
            .addCase(fetchBookmarks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(createBookmark.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createBookmark.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                state.bookmarks.unshift(action.payload.data);
            })
            .addCase(createBookmark.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
            .addCase(updatedBookmark.pending, (state) => {
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(updatedBookmark.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload.message;

                const updated = action.payload.data;
                if (updated) {
                    const index = state.bookmarks.findIndex((bookmark) => bookmark._id === updated._id);
                    if (index === -1) state.bookmarks[index] = updated;
                    if (state.selectBookmark?._id === updated._id) {
                        state.selectBookmark = updated
                    }
                }
            })
            .addCase(updatedBookmark.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string
            })
            .addCase(deletedBookmarks.pending, (state) => {
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(deletedBookmarks.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload.message;

                state.bookmarks = state.bookmarks.filter((bookmark) => bookmark._id !== action.payload._id);
                if (state.selectBookmark?._id === action.payload._id) {
                    state.selectBookmark = null
                }
            })
            .addCase(deletedBookmarks.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string
            })
    },
});

export const { clearError, clearSleectedBookmarks, clearSuccessMessage, setSelectBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;