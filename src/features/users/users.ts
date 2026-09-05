import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "@/types/user";
import { Pagination } from "@/types/pagination";

export interface UsersState {
    users: User[];
    selectedUser: User | null;
    pagination: Pagination | null;
    isLoading: boolean;
    errors: string | null;
    successMessage: string | null;
};

const initialState: UsersState = {
    users: [],
    selectedUser: null,
    pagination: null,
    isLoading: false,
    errors: null,
    successMessage: null
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (
        params: { page?: number; limit?: number; search?: string; role?: string; isValid?: string } = {},
        { rejectWithValue }
    ) => {
        try {
            const query = new URLSearchParams();
            if (params.page) query.append("page", String(params.page));
            if (params.limit) query.append("limit", String(params.limit));
            if (params.search) query.append("search", String(params.search));
            if (params.role) query.append("role", String(params.role));
            if (params.isValid) query.append("isValid", String(params.isValid));

            const response = await axios.get(`/api/users?=${query.toString()}`, { withCredentials: true });

            return response.data;
        } catch (err: any) {
            const axiosError = err as AxiosError<any>;
            return rejectWithValue(
                axiosError.response?.data?.message || "خطا در دریافت کاربران"
            )
        }
    }
);

export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/users/${id}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message);
    }
});

export const updateProfile = createAsyncThunk("users/updateProfile", async (data: FormData | Record<string, any>, { rejectWithValue }) => {
    try {
        const isFormData = data as FormData;
        const response = await axios.put(`/api/users/me`, data, {
            withCredentials: true,
            headers: isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>
        return rejectWithValue(axiosError.response?.data?.message);
    }
});

export const requestChangeEmailOTP = createAsyncThunk("users/requestChangeEmailOTP", async (email: string, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/users/me/email`, { identifier: email }, { withCredentials: true });
        return response.data
    } catch (err: any) {
        const axiosError = err as AxiosError<any>
        return rejectWithValue(axiosError.response?.data?.message);
    }
});

export const confirmChangeEmail = createAsyncThunk("users/confirmChangeEmail", async ({ identifier, code }: { identifier: string, code: string }, { rejectWithValue }) => {
    try {
        const response = await axios.put("/api/users/email", { identifier, code }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError)
    }
});

export const requestChangePhoneOTP = createAsyncThunk("users/requestChangePhone", async (phone: string, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/users/phone", { identifier: phone }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError)
    }
});

export const confirmChangePhone = createAsyncThunk("users/confirmChangePhone", async ({ identifier, code }: { identifier: string, code: string }, { rejectWithValue }) => {
    try {
        const response = await axios.put("/api/users/phone", { identifier, code }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message);
    }
});

export const changeUserRole = createAsyncThunk("users/changeUserRole", async ({ _id, role }: { _id: string, role: string }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/users/${_id}/role`, { role }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message);
    }
});

export const deleteUsers = createAsyncThunk("users/deleteUser", async (ids: string[], { rejectWithValue }) => {
    try {
        const response = await axios.delete("/api/users", { data: ids, withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message);
    }
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearUsersError: (state) => {
            state.errors = null;
        },
        clearUsersSuccess: (state) => {
            state.successMessage = null
        },
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
        setSelectedUser: (state, action: PayloadAction<User | null>) => {
            state.selectedUser = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data?.users || [];
                state.pagination = action.payload.data?.pagination || null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(fetchUserById.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedUser = action.payload.data || null;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = true;
                if (action.payload.data) state.selectedUser = action.payload.data
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(requestChangeEmailOTP.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(requestChangeEmailOTP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message
            })
            .addCase(requestChangeEmailOTP.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(confirmChangeEmail.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(confirmChangeEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                if (action.payload.data?.user) action.payload.data?.user;
            })
            .addCase(confirmChangeEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(requestChangePhoneOTP.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(requestChangePhoneOTP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                if (action.payload.data?.user) action.payload.data?.user;
            })
            .addCase(requestChangePhoneOTP.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(confirmChangePhone.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(confirmChangePhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;
                if (action.payload.data?.user) action.payload.data?.user;
            })
            .addCase(confirmChangePhone.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(changeUserRole.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(changeUserRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.data?.message;
                const updated = action.payload.data;
                if (updated) {
                    const index = state.users.findIndex((user: any) => user._id === updated._id);
                    if (index !== 1) {
                        state.users[index] = {
                            ...state.users[index],
                            role: updated.role
                        }
                    }
                    if (state.selectedUser && state.selectedUser._id === updated._id) {
                        state.selectedUser = {
                            ...state.selectedUser,
                            role: updated.role
                        }
                    }
                }
            })
            .addCase(changeUserRole.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload as string;
            })

            .addCase(deleteUsers.pending, (state) => {
                state.isLoading = true;
                state.errors = null;
            })
            .addCase(deleteUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.data?.message;
                const deletedIds: string[] = action.payload.data?.deletedIds || [];
                state.users = state.users.filter((user) => !deletedIds.includes(user._id));
            })
            .addCase(deleteUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.error as string;
            })
    },
});

export const { clearUsersError, clearSelectedUser, clearUsersSuccess, setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;