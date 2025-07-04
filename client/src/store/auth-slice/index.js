import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"


// Initial State
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
}

// Register Reducers
const registerUser = createAsyncThunk(
    "auth/register",

    // Get the data from the frontend
    async (values) => {
        // Send the data to the backend
        const response = await axios.post("http://localhost:5000/api/auth/register", values, {
            withCredentials: true
        });
        // Return the response
        return response.data;
    }
)

// Login Reducers
const loginUser = createAsyncThunk(
    "auth/login",

    // Get the data from the frontend
    async (values) => {
        // Send the data to the backend
        const response = await axios.post("http://localhost:5000/api/auth/login", values, {
            withCredentials: true
        });
        // Return the response
        return response.data;
    }
)
// Check Auth Reducers
const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async () => {
        const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
            withCredentials: true
        });
        return response.data;
    }
)

// Logout Reducers
const logoutUser = createAsyncThunk(
    "auth/logout",
    async () => {
        const response = await axios.post("http://localhost:5000/api/auth/logout", {
            withCredentials: true
        });
        return response.data;
    }
)


// Create a AuthSlice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
        }
    }
    ,
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
        }).addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        }).addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.success;
        }).addCase(checkAuth.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})

// Export the Reducer and Actions
export const {setUser} = authSlice.actions
export default authSlice.reducer
export {registerUser, loginUser, checkAuth, logoutUser};