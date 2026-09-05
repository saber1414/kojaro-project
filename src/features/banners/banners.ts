import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Banner } from "@/types/banner";

export interface BannerState {
    banners: Banner[];
    selectedBanner: Banner | null;
    isLoading: boolean;
    errors: string | null;
    successMessage: string | null
};

const initialState: BannerState = {
    banners: [],
    selectedBanner: null,
    isLoading: false,
    errors: null,
    successMessage: null
};


export const fetchBanners = createAsyncThunk("banners/fetchBanners", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/banners");
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const createBanner = createAsyncThunk("banners/createBanner", async (formData: FormData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/banners", formData, {
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

export const updatedBanner = createAsyncThunk("banners/updatedBanner", async ({ _id, formData }: { _id: string, formData: FormData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/banners/${_id}`, formData, {
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

export const deletedBanner = createAsyncThunk("banners/deletedBanner", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/banners/${_id}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

const bannerSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {
        clearBannerError: (state) => {
            state.errors = null;
        },
        clearBannerSuccess: (state) => {
            state.successMessage = null;
        },
        clearSelectedBanner: (state) => {
            state.selectedBanner = null
        },
        setSelectedBanner: (state, action: PayloadAction<Banner | null>) => {
            state.selectedBanner = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.isLoading = false;
                state.banners = action.payload.data || []
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(createBanner.pending, (state, action) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(createBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                state.banners.unshift(action.payload.data)
            })
            .addCase(createBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(updatedBanner.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(updatedBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                const updated = action.payload.data;
                if (updated) {
                    const index = state.banners.findIndex((banner) => banner._id === updated._id);
                    if (index !== -1) state.banners[index] = updated;
                    if (state.selectedBanner?._id === updated._id) {
                        state.selectedBanner = updated
                    }
                }
            })
            .addCase(updatedBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(deletedBanner.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(deletedBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                state.banners = state.banners.filter((banner) => banner._id !== action.payload._id);
                if (state.selectedBanner?._id === action.payload._id) {
                    state.selectedBanner = null
                }
            })
            .addCase(deletedBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
    },
});

export const { clearBannerError, clearBannerSuccess, clearSelectedBanner, setSelectedBanner } = bannerSlice.actions;
export default bannerSlice.reducer;