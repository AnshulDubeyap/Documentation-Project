import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk to fetch all users
export const fetchAllUsers = createAsyncThunk("user/fetchAllUsers", async () => {
    try {
        const {data} = await axios.get("http://localhost:5000/api/user/getallusers", {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

// Initial State
const initialState = {
    allUsers: [],
    isLoading: false,
    error: null,
};

// Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUsers = action.payload.data;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch users";
            });
    },
});

export default userSlice.reducer;
