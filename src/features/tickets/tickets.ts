import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Ticket, TicketPriority, TicketStatus } from "@/types/ticket";
import { Pagination } from "@/types/pagination";

export interface TicketsState {
    tickets: Ticket[];
    selectedTicket: Ticket | null;
    pagination: Pagination | null;
    isLoading: boolean;
    isUpdated: boolean;
    error: string | null;
    successMessage: string | null;
};

const initialState: TicketsState = {
    tickets: [],
    selectedTicket: null,
    pagination: null,
    isLoading: false,
    isUpdated: false,
    error: null,
    successMessage: null
};

export const fetchTickets = createAsyncThunk("tickets/fetchTickets", async (
    parems: { page?: number, limit?: number, status?: string, priority?: string, category?: string, search?: string },
    { rejectWithValue }
) => {
    try {
        const query = new URLSearchParams();

        if (parems.page) query.append("page", String(parems.page));
        if (parems.limit) query.append("limit", String(parems.limit));
        if (parems.status) query.append("status", parems.status);
        if (parems.priority) query.append("priority", parems.priority);
        if (parems.category) query.append("category", parems.category);
        if (parems.search) query.append("search", parems.search);

        const response = await axios.get(`/api/tickets?=${query}`, { withCredentials: true });
        return response.data
    } catch (err: any) {
        const axisoError = err as AxiosError<any>
        return rejectWithValue(axisoError.response?.data?.message)
    }
});

export const fetchTicketById = createAsyncThunk("tickets/fetchTicketById", async (_id: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/tickets/${_id}`, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axisoError = err as AxiosError<any>
        return rejectWithValue(axisoError.response?.data?.message)
    }
});

export const createTicket = createAsyncThunk("tickets/createTicket", async (
    data: { subject: string, message: string, priority?: string, category?: string, createdBy: string, status?: string },
    { rejectWithValue }
) => {
    try {
        const response = await axios.post("/api/tickets", data, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axisoError = err as AxiosError<any>
        return rejectWithValue(axisoError.response?.data?.message)
    }
});

export const replayTiclet = createAsyncThunk("tickets/replayTicket", async (
    { _id, message, isInternal }: { _id: string, message: string, isInternal?: boolean },
    { rejectWithValue }
) => {
    try {
        const response = await axios.post(`/api/ticlers/${_id}/replay`, { message, isInternal }, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axisoError = err as AxiosError<any>
        return rejectWithValue(axisoError.response?.data?.message)
    }
});

export const updateTicket = createAsyncThunk("tickets/updateTicket", async (
    { _id, data }: { _id: string, data: { status?: TicketStatus, priority?: TicketPriority, assignedTo?: string | null } },
    { rejectWithValue }
) => {
    try {
        const response = await axios.patch(`/api/tickets/${_id}`, data, { withCredentials: true });
        return response.data;
    } catch (err: any) {
        const axisoError = err as AxiosError<any>
        return rejectWithValue(axisoError.response?.data?.message)
    }
});

export const deletedTickets = createAsyncThunk("tickets/deletedTickets", async (ids: string[], { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/tickets`, {
            data: { ids },
            withCredentials: true
        });
        return response.data;
    } catch (err: any) {
        const axisoError = err as AxiosError<any>
        return rejectWithValue(axisoError.response?.data?.message)
    }
});

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        clearTicketsError: (state) => {
            state.error = null;
        },
        clearTicketsSuccess: (state) => {
            state.successMessage = null;
        },
        clearSelectedTicket: (state) => {
            state.selectedTicket = null;
        },
        setSelectedTicket: (state, action: PayloadAction<Ticket | null>) => {
            state.selectedTicket = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tickets = action.payload.data?.tickets || [];
                state.pagination = action.payload.data?.pagination || null
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
            .addCase(fetchTicketById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTicketById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tickets = action.payload.data?.tickets || null
            })
            .addCase(fetchTicketById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.successMessage = action.payload?.message;
                if (action.payload.data) {
                    state.tickets.unshift(action.payload.data)
                }
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateTicket.pending, (state) => {
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload?.message;
                const updated = action.payload.data;
                if (!updated) return;
                state.tickets = state.tickets.map((ticket) => ticket._id === updated._id ? { ...ticket, ...updated } : ticket);
                if (state.selectedTicket?._id === updated._id) {
                    state.selectedTicket = { ...state.selectedTicket, ...updated }
                };
            })
            .addCase(updateTicket.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string;
            })
            .addCase(replayTiclet.pending, (state) => {
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(replayTiclet.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload?.message;
                const updated = action.payload.data;
                state.tickets = state.tickets.map((ticket) =>
                    ticket._id === updated._id ? { ...ticket, status: updated.status, lastReplyAt: updated.lastReplyAt } : ticket
                )
            })
            .addCase(replayTiclet.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string
            })
            .addCase(deletedTickets.pending, (state) => {
                state.isUpdated = true;
                state.error = null;
            })
            .addCase(deletedTickets.fulfilled, (state, action) => {
                state.isUpdated = false;
                state.successMessage = action.payload?.message;
                state.tickets = state.tickets.filter((ticket) => ticket._id !== action.payload.id);
                if (state.selectedTicket?._id === action.payload.id) {
                    state.selectedTicket = null
                }
            })
            .addCase(deletedTickets.rejected, (state, action) => {
                state.isUpdated = false;
                state.error = action.payload as string;
            })
    },
});

export const { clearSelectedTicket, clearTicketsError, clearTicketsSuccess, setSelectedTicket } = ticketSlice.actions;
export default ticketSlice.reducer;