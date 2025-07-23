// Initialize the store

import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import userReducer from "./user-slice";
import docsReducer from "./docs-slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        docs: docsReducer
    }
})

export default store