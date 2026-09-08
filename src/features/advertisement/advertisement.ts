import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Advertisement } from "@/types/advertisement";


export interface AdvertisementState {
    data: Advertisement[];
    selectAds: Advertisement | null;
    isLoading: boolean;
    errors: string | null;
    successMessage: string | null
};

const initialState: AdvertisementState = {
    data: [],
    selectAds: null,
    isLoading: false,
    errors: null,
    successMessage: null
};

export const fetchAds = createAsyncThunk("ads/fetchAds", async (params: { isActive?: boolean } = {}, { rejectWithValue }) => {
    try {
        const query = new URLSearchParams();

        if (params.isActive !== undefined) query.append("isActive", String(params.isActive));

        const response = await axios.get(`/api/ads?=${query.toString()}`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const fetchAdsById = createAsyncThunk("ads/fetchAdsById", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/ads/${_id}`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const createAds = createAsyncThunk("ads/createAds", async (formData: FormData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/ads", formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const updateAds = createAsyncThunk("ads/updateAds", async ({ _id, formData }: { _id: string, formData: FormData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/ads/${_id}`, formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

export const deleteAds = createAsyncThunk("ads/deleteAds", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/ads/${_id}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

const adsSlice = createSlice({
    name: "ads",
    initialState,
    reducers: {
        clearAdsError: (state) => {
            state.errors = null;
        },
        clearAdSuccess: (state) => {
            state.successMessage = null;
        },
        clearSelectedAds: (state) => {
            state.selectAds = null;
        },
        setSelectedAds: (state, action: PayloadAction<Advertisement | null>) => {
            state.selectAds = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAds.pending, (state) => {
                state.isLoading = true;
                state.errors = null
            })
            .addCase(fetchAds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data || []
            })
            .addCase(fetchAds.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(fetchAdsById.pending, (state, action) => {
                state.isLoading = true;
                state.errors = null
            })
            .addCase(fetchAdsById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data
            })
            .addCase(fetchAdsById.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(createAds.pending, (state) => {
                state.isLoading = true;
                state.errors = null
            })
            .addCase(createAds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                state.data.unshift(action.payload.data)
            })
            .addCase(createAds.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(updateAds.pending, (state) => {
                state.isLoading = true;
                state.errors = null
            })
            .addCase(updateAds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                const updated = action.payload.data;
                if (updated) {
                    const index = state.data.findIndex((ads) => ads._id === updated._id);
                    if (index !== -1) state.data[index] = updated;
                    if (state.selectAds?._id === updated._id) {
                        state.selectAds = null
                    }
                }
            })
            .addCase(updateAds.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string
            })
            .addCase(deleteAds.pending, (state, action) => {
                state.isLoading = true;
                state.errors = null
            })
            .addCase(deleteAds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                state.data = state.data.filter((ads) => ads._id !== action.payload._id);
                if (state.selectAds?._id === action.payload._id) {
                    state.selectAds = null
                }
            })
    },
});


export const { clearAdSuccess, clearAdsError, clearSelectedAds, setSelectedAds } = adsSlice.actions;
export default adsSlice.reducer;