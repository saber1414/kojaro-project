import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Menu } from "@/types/menu";

export interface MenuState {
    menus: Menu[];
    selectedMenu: Menu | null;
    isLoading: boolean;
    isUpdated: boolean;
    error: string | null;
    successMessage: string | null
};

const initialState: MenuState = {
    menus: [],
    selectedMenu: null,
    isLoading: false,
    isUpdated: false,
    error: null,
    successMessage: null
};

export const fetchMenus = createAsyncThunk("categories/fetchMenus", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/pi/categories");
        return response.data;
    } catch (err: any) {
        const errorMessage = err as AxiosError<any>
        return rejectWithValue(errorMessage.response?.data?.message)
    }
});

export const fetchByIdMenu = createAsyncThunk("categories/fetchByIdMenu", async (param: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/categories/${param}`);
        return response.data;
    } catch (err: any) {
        const errorMessage = err as AxiosError<any>
        return rejectWithValue(errorMessage.response?.data?.message)
    }
});

export const createMenu = createAsyncThunk("categories/createMenu", async (formData: FormData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/categories", formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (err: any) {
        const errorMessage = err as AxiosError<any>
        return rejectWithValue(errorMessage.response?.data?.message)
    }
});

export const editMenu = createAsyncThunk("categories/editMenu", async (
    { _id, formData }: { _id: string, formData: FormData },
    { rejectWithValue }
) => {
    try {
        const response = await axios.patch(`/api/categories/${_id}`, formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (err: any) {
        const errorMessage = err as AxiosError<any>
        return rejectWithValue(errorMessage.response?.data?.message)
    }
});

export const deletedMenus = createAsyncThunk("categories/deletedMenus", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/categpries/${_id}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const errorMessage = err as AxiosError<any>
        return rejectWithValue(errorMessage.response?.data?.message)
    }
});

const menusSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        clearErrorMessage: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
        clearSelectedMenus: (state) => {
            state.selectedMenu = null
        },
        setSelectedMenus: (state, action: PayloadAction<any>) => {
            state.selectedMenu = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMenus.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchMenus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menus = action.payload.data?.articles || [];
            })
            .addCase(fetchMenus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
            .addCase(fetchByIdMenu.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchByIdMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menus = action.payload.data || null
            })
            .addCase(fetchByIdMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(createMenu.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(createMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.data?.message;
                if (action.payload.data) state.menus.unshift(action.payload.data);
            })
            .addCase(createMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(editMenu.pending, (state) => {
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(editMenu.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload.data?.message;
                const updated = action.payload.data;
                if (updated) {
                    const index = state.menus.findIndex((menu) => menu._id === updated._id);
                    if (index !== -1) state.menus[index] = updated;
                };
                if (state.selectedMenu?._id === updated._id) {
                    state.selectedMenu = updated;
                }
            })
            .addCase(editMenu.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string;
            })
            .addCase(deletedMenus.pending, (state) => {
                state.isUpdated = true;
                state.error = null
            })
            .addCase(deletedMenus.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload.data?.message;
                state.menus.filter((menu) => menu._id !== action.payload._id);
                if (state.selectedMenu?._id === action.payload._id) {
                    state.selectedMenu = null
                }
            })
            .addCase(deletedMenus.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string
            })
    },
});

export const { clearErrorMessage, clearSelectedMenus, clearSuccessMessage, setSelectedMenus } = menusSlice.actions;
export default menusSlice.reducer;