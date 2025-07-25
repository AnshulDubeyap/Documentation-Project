import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Create Document
export const createDocument = createAsyncThunk(
    "docs/createDocument",
    async (values) => {
        const response = await axios.post("http://localhost:5000/api/docs/create", values, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Fetch All Documents by Author (includes private and public)
export const fetchDocumentsByAuthor = createAsyncThunk(
    "docs/fetchDocumentsByAuthor",
    async () => {
        const response = await axios.get("http://localhost:5000/api/docs/getall/author", {
            withCredentials: true,
        });
        return response.data;
    }
);

// Delete a Document
export const deleteDocument = createAsyncThunk(
    "docs/deleteDocument",
    async (id) => {
        await axios.delete(`http://localhost:5000/api/docs/delete/${id}`, {
            withCredentials: true,
        });
        return id;
    }
);

// Fetch Public Documents
export const fetchPublicDocuments = createAsyncThunk(
    "docs/fetchPublicDocuments",
    async () => {
        const response = await axios.get("http://localhost:5000/api/docs/getpublic", {
            withCredentials: true,
        });
        return response.data;
    }
);


// Fetch Private Documents
export const fetchPrivateDocuments = createAsyncThunk(
    "docs/fetchPrivateDocuments",
    async () => {
        const response = await axios.get("http://localhost:5000/api/docs/getprivate", {
            withCredentials: true,
        });
        return response.data;
    }
);

// Slice
const docsSlice = createSlice({
    name: "docs",
    initialState: {
        documents: [],
        publicDocuments: [],
        privateDocuments: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Documents by Author
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
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPublicDocuments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.publicDocuments = action.payload.data || [];
            })
            .addCase(fetchPublicDocuments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch public documents";
            })

            // Fetch Private Documents
            .addCase(fetchPrivateDocuments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPrivateDocuments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.privateDocuments = action.payload.data || [];
            })
            .addCase(fetchPrivateDocuments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch private documents";
            })

    },
});

export default docsSlice.reducer;
