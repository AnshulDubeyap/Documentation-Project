import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const createDocument = createAsyncThunk(
    "docs/createDocument",
    async (values) => {
        const response = await axios.post("http://localhost:5000/api/docs/create", values, {
            withCredentials: true,
        });
        return response.data;
    }
);

