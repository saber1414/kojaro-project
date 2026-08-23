import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import axios, { AxiosError } from "axios";

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    step: "request" | "verify" | "setPassword" | "complete";
    identifier: string | null;
    isNewUser: boolean;
    needsPassword: boolean
};

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    step: "request",
    identifier: null,
    isNewUser: false,
    needsPassword: false
};

export const requestOTP = createAsyncThunk("auth/requestOTP", async (identifier: string, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/auth/request-otp", { identifier });
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message || 'خطا در ارسال کد تایید');
    }
});

export const verifyOTP = createAsyncThunk("auth/loginWithPassword", async ({ identifier, code }: { identifier: string, code: string }, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/auth/verify-otp", { identifier, code });
        return response.data
    } catch (error: any) {
        const axiosError = error as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message || "خطا در تایید کد")
    }
});

export const setPassword = createAsyncThunk("auth/setPassword", async (password: string, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/auth/set-passwprd", { password });
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message || "خطا در تنظیم رمز عبور")
    }
});

export const loginWithGoogle = createAsyncThunk("auth/loginWithGoogle", async (_, { rejectWithValue }) => {
    try {
        window.location.href = "/api/auth/signin/google";
        return { success: true };
    } catch (error: any) {
        return rejectWithValue('خطا در اتصال به گوگل');
    }
});

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/auth/me', {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response?.status === 401) {
            return rejectWithValue(null); 
        }
        return rejectWithValue(axiosError.response?.data?.message || 'خطا در دریافت اطلاعات کاربر');
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await axios.post("/api/auth/logout");
        return { success: true }
    } catch (error: any) {
        const axiosError = error as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.message || "خطا در خروج از حساب")
    }
});

export const register = createAsyncThunk(
    'auth/register',
    async (data: {
        email: string;
        phone: string;
        password: string;
        fullname: string;
        username?: string;
    }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/register', data);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<any>;
            return rejectWithValue(axiosError.response?.data?.message || 'خطا در ثبت‌نام');
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error || null
        },
        resetAuth: (state) => {
            state.step = "request";
            state.identifier = null;
            state.isNewUser = false;
            state.needsPassword = false;
            state.error = null;
        },
        setStep: (state, action: PayloadAction<AuthState['step']>) => {
            state.step = action.payload;
        },
        setIdentifier: (state, action: PayloadAction<string>) => {
            state.identifier = action.payload;
        },
        setIsNewUser: (state, action: PayloadAction<boolean>) => {
            state.isNewUser = action.payload;
        },
        setNeedsPassword: (state, action: PayloadAction<boolean>) => {
            state.needsPassword = action.payload;
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(requestOTP.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(requestOTP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.identifier = action.payload.data.identifier;
                state.isNewUser = action.payload.data.isNewUser;
                state.needsPassword = action.payload.data.hasPassword === false;
                state.step = "verify";
                state.error = null;
            })
            .addCase(requestOTP.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.needsPassword = action.payload.needsPassword;
                state.step = action.payload.needsPassword ? "setPassword" : "complete";
                state.error = null
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(setPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(setPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.step = "complete";
                state.error = null;
            })
            .addCase(setPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.step = "complete";
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.step = "request";
                state.identifier = null;
                state.needsPassword = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const {
    clearError,
    resetAuth,
    setStep,
    setIdentifier,
    setIsNewUser,
    setNeedsPassword,
    setUser,
} = authSlice.actions;

export default authSlice.reducer;