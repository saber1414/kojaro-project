import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Pagination } from "@/types/pagination";
import { FollowItem, FeedArticle, FollowTargetType } from "@/types/follow";

export interface FollowState {
    myFollows: FollowItem[];
    feedArticles: FeedArticle[];
    feedPagination: Pagination | null;
    isFollowingMap: Record<string, boolean>;
    countsMap: Record<string, number>;
    isLoading: boolean;
    isUpdateing: boolean;
    error: string | null;
    successMessage: string | null;
};

const initialState: FollowState = {
    myFollows: [],
    feedArticles: [],
    feedPagination: null,
    isFollowingMap: {},
    countsMap: {},
    isLoading: false,
    isUpdateing: false,
    error: null,
    successMessage: null
};

const makeKey = (targetType: FollowTargetType, targetId: string) => `${targetType}:${targetId}`;

export const followTarget = createAsyncThunk("follows/followTarget", async (
    { targetType, targetId }: { targetType: FollowTargetType, targetId: string },
    { rejectWithValue }
) => {
    try {
        const response = await axios.post("/api/follows", { targetType, targetId }, { withCredentials: true });
        return { ...response.data, targetType, targetId };
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.messsage)
    }
});

export const unfollowTarget = createAsyncThunk("follows/unfollowTarget", async (
    { targetType, targetId }: { targetType: FollowTargetType, targetId: string },
    { rejectWithValue }
) => {
    try {
        const response = await axios.delete("/api/follows", { data: { targetType, targetId }, withCredentials: true });
        return { ...response.data, targetType, targetId }
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.messsage)
    }
});

export const fetchMyFollows = createAsyncThunk("follows/fetchMyFollows", async (
    params: { targetType?: FollowTargetType } = {},
    { rejectWithValue }
) => {
    try {
        const qury = new URLSearchParams();

        if (params.targetType) qury.append("targetType", params.targetType);

        const response = await axios.get(`/api/follows/me?${qury.toString()}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.messsage)
    }
});

export const checkFollow = createAsyncThunk("follows/checkFollow", async (
    { targetType, targetId }: { targetType: FollowTargetType, targetId: string },
    { rejectWithValue }
) => {
    try {
        const response = await axios.get(`/api/follows/check?targetType=${targetType}&targetId=${targetId}`, { withCredentials: true });
        return {
            targetType,
            targetId,
            isFollowing: response.data?.data?.isFollowing ?? false
        }
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.messsage)
    }
});

export const fetchFollowCount = createAsyncThunk("follows/fetchFollowCount", async (
    { targetType, targetId }: { targetType: FollowTargetType, targetId: string },
    { rejectWithValue }
) => {
    try {
        const response = await axios.get(`/api/follows/count?targetType=${targetType}&targetId=${targetId}`, { withCredentials: true });
        return {
            targetType,
            targetId,
            count: response.data?.data?.count ?? 0
        }
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.messsage)
    }
});

export const fetchFollowFeed = createAsyncThunk("follows/fetchFollowFeed", async (
    params: { page?: number, limit?: number } = {},
    { rejectWithValue }
) => {
    try {
        const qury = new URLSearchParams();

        if (params.page) qury.append("page", String(params.page));
        if (params.limit) qury.append("limit", String(params.limit));

        const response = await axios.get(`/api/follows/feed?${qury.toString()}`);
        return response.data;
    } catch (err: any) {
        const axiosError = err as AxiosError<any>;
        return rejectWithValue(axiosError.response?.data?.messsage)
    }
});

const followsSlice = createSlice({
    name: "follows",
    initialState,
    reducers: {
        clearFollowsError: (status) => {
            status.error = null;
        },
        clearSuccessMessage: (status) => {
            status.successMessage = null;
        },
        setIsFollowing: (state, action: PayloadAction<{ targeType: FollowTargetType, targetId: string, isFollowing: boolean }>) => {
            const { targeType, targetId, isFollowing } = action.payload;
            state.isFollowingMap[makeKey(targeType, targetId)] = isFollowing;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(followTarget.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(followTarget.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload.message;

                const { tagetType, targetId } = action.payload;
                const key = makeKey(tagetType, targetId);

                state.isFollowingMap[key] = true;
                state.countsMap[key] = (state.countsMap[key] || 0) + 1;
            })
            .addCase(followTarget.rejected, (state, action) => {
                state.isUpdateing = false;
                state.error = action.payload as string
            })
            .addCase(unfollowTarget.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(unfollowTarget.fulfilled, (state, action) => {
                state.isUpdateing = false;
                state.successMessage = action.payload.message;

                const { tagetType, targetId } = action.payload;
                const key = makeKey(tagetType, targetId);

                state.isFollowingMap[key] = false;
                state.countsMap[key] = Math.max(0, (state.countsMap[key] || 1) - 1);
                state.myFollows = state.myFollows.filter((follow) => !(follow.targetType === tagetType && follow.targetId === targetId));
            })
            .addCase(unfollowTarget.rejected, (state, action) => {
                state.isUpdateing = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMyFollows.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyFollows.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myFollows = action.payload.data || [];

                for (const item of state.myFollows) {
                    const key = makeKey(item.targetType, item.targetId);
                    state.isFollowingMap[key] = true;
                }
            })
            .addCase(fetchMyFollows.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(checkFollow.pending, (state) => {
                state.isUpdateing = true;
                state.error = null;
            })
            .addCase(checkFollow.fulfilled, (state, action) => {
                state.isUpdateing = false;
                const { targetType, targetId, isFollowing } = action.payload;

                state.isFollowingMap[makeKey(targetType, targetId)] = isFollowing
            })
            .addCase(checkFollow.rejected, (state, action) => {
                state.isUpdateing = false;
                state.error = action.payload as string
            })
            .addCase(fetchFollowCount.pending, (state, action) => {
                state.isUpdateing = true;
                state.error = null;
            })
            .addCase(fetchFollowCount.fulfilled, (state, action) => {
                state.isUpdateing = false;
                const { targetType, targetId, count } = action.payload;
                state.countsMap[makeKey(targetType, targetId)] = count;
            })
            .addCase(fetchFollowFeed.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFollowFeed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedArticles = action.payload.data?.articles || [];
                state.feedPagination = action.payload.data.pagination || null
            })
            .addCase(fetchFollowFeed.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearFollowsError, clearSuccessMessage, setIsFollowing } = followsSlice.actions;
export default followsSlice.reducer;