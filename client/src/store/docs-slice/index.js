import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk to create a new document
export const createDocument = createAsyncThunk(
    "docs/createDocument",
    async (values) => {
        const response = await axios.post("http://localhost:5000/api/docs/create", values, {
            withCredentials: true,
        });
        return response.data;
    }
);

// AsyncThunk to fetch all documents that are made by author
export const fetchDocumentsByAuthor = createAsyncThunk(
    "docs/fetchDocumentsByAuthor",
    async () => {
        const response = await axios.get("http://localhost:5000/api/docs/getall/author", {
            withCredentials: true,
        });
        return response.data;
    }
);

// Delete Document
export const deleteDocument = createAsyncThunk(
    "docs/deleteDocument",
    async (id) => {
        await axios.delete(`http://localhost:5000/api/docs/delete/${id}`, {
            withCredentials: true,
        });
        return id;
    }
);

// Fetch Documents that are public
export const fetchPublicDocuments = createAsyncThunk(
    "docs/fetchPublicDocuments",
    async () => {
        const response = await axios.get("http://localhost:5000/api/docs/getpublic", {
            withCredentials: true,
        });
        return response.data;
    }
);

// Create a docsSlice
const docsSlice = createSlice({
    name: "docs",
    initialState: {
        documents: [],
        publicDocuments: [],
        isLoading: false, // Standardized loading state
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Documents by Author
        builder
            .addCase(fetchDocumentsByAuthor.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDocumentsByAuthor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.documents = action.payload.data || [];
            })
            .addCase(fetchDocumentsByAuthor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch documents";
            })
            // Create Document
            .addCase(createDocument.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createDocument.fulfilled, (state, action) => {
                state.isLoading = false;
                state.documents.push(action.payload.data);
            })
            .addCase(createDocument.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to create document";
            })
            // Delete Document
            .addCase(deleteDocument.fulfilled, (state, action) => {
                state.documents = state.documents.filter(doc => doc._id !== action.payload);
            })
            // Fetch Public Documents
            .addCase(fetchPublicDocuments.pending, (state) => {
                state.isLoading = true; // Changed from loading to isLoading
                state.error = null;
            })
            .addCase(fetchPublicDocuments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.publicDocuments = action.payload.data || []; // Match backend response
            })
            .addCase(fetchPublicDocuments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default docsSlice.reducer;
