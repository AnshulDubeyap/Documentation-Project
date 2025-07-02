import {createSlice} from "@reduxjs/toolkit"


// Initial State
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
}

// Create a AuthSlice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
        }
    }
})

// Export the Reducer and Actions
export const {setUser} = authSlice.actions
export default authSlice.reducer