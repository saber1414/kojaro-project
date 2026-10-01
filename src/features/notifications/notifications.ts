import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Notification } from "@/types/notification";
import { Pagination } from "@/types/pagination";

export interface NotificationState {
    notifications: Notification[];
    seletedNotification: Notification | null;
    pagination: Pagination | null;
    isLoading: boolean;
    isUpdated: boolean;
    error: string | null;
    successMessage: string | null
};

const initialState: NotificationState = {
    notifications: [],
    seletedNotification: null,
    pagination: null,
    isLoading: false,
    isUpdated: false,
    error: null,
    successMessage: null
};

const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async (
    param: { page?: number, limit?: number, search?: string },
    { rejectWithValue }
) => {
    try {
        const query = new URLSearchParams();

        if (param.page) query.append("page", String(param.page));
        if (param.limit) query.append("limit", String(param.limit));
        if (param.search) query.append("search", param.search);

        const response = await axios.get(`/api/notifications?=${query.toString()}`, { withCredentials: true });
        return response.data
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

const fetchByNotification = createAsyncThunk("notifications/fetchByNotification", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/notifications/${_id}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

const createNotification = createAsyncThunk("notifications/createNotification", async (
    data: Notification,
    { rejectWithValue }
) => {
    try {
        const response = await axios.post(`/api/notifications`, data, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

const editNotification = createAsyncThunk("notifications/editNotification", async (
    { _id, data }: { _id: string, data: Notification },
    { rejectWithValue }
) => {
    try {
        const response = await axios.put(`/api/notifications/${_id}`, { data }, { withCredentials: true });
        return response.data
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});

const deletedNotidfications = createAsyncThunk("notifications/deletedNotidfications", async (ids: string[], { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/notifications/${ids}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message)
    }
});


const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        clearNoticiationError: (state) => {
            state.error = null
        },
        clearNotificationSuccess: (state) => {
            state.successMessage = null
        },
        clearSelectedNotification: (state) => {
            state.seletedNotification = null
        },
        setSelectNotification: (state, action: PayloadAction<Notification | null>) => {
            state.seletedNotification = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notifications = action.payload.data?.notifications || [];
                state.pagination = action.payload.data?.pagination || null
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchByNotification.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchByNotification.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notifications = action.payload.data?.notification || null
            })
            .addCase(fetchByNotification.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
            .addCase(createNotification.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(createNotification.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload?.message;
                if (action.payload.data) {
                    state.notifications.unshift(action.payload.data);
                    if (state.pagination) state.pagination.total += 1;
                }
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
            .addCase(editNotification.pending, (state) => {
                state.isUpdated = true;
                state.error = null
            })
            .addCase(editNotification.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload.data?.message;
                const updated = action.payload.data;
                if (updated) {
                    const index = state.notifications.findIndex((notification) => notification._id === updated._id);
                    if (index !== -1) state.notifications[index] = updated;
                    if (state.seletedNotification?._id === updated._id) state.seletedNotification = updated
                }
            })
            .addCase(editNotification.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string
            })
            .addCase(deletedNotidfications.pending, (state) => {
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(deletedNotidfications.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload?.message;
                state.notifications.filter((notification) => notification._id !== action.payload._id);
                if (state.seletedNotification?._id === action.payload._id) {
                    state.seletedNotification = null
                };
                if (state.pagination) {
                    state.pagination.total = Math.max(0, state.pagination.total - 1)
                }
            })
            .addCase(deletedNotidfications.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string
            })
    },
});

export const { clearNoticiationError, clearNotificationSuccess, clearSelectedNotification, setSelectNotification } = notificationSlice.actions;
export default notificationSlice.reducer;