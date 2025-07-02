import {createSlice} from "@reduxjs/toolkit"


// Initial State
const initalState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
}

// Create a AuthSlice
const authSlice = createSlice({
    name: "auth",
    initalState,
    reducers: {
        setUser: (state, action) => {
        }
    }
})

// Export the Reducer and Actions
export const {setUser} = authSlice.actions
export default authSlice.reducer