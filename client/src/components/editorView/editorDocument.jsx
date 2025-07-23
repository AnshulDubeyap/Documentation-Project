import React, {useEffect} from "react";
import "./editorDocuent.css";
import {useDispatch, useSelector} from "react-redux";
import {deleteDocument, fetchDocumentsByAuthor} from "../../store/docs-slice";

function AuthorDocument({setSelectedDocument, setOpen}) {
    const dispatch = useDispatch();

    // Get documents from store
    const documents = useSelector((state) => state.docs.documents);
    console.log(documents, "Documents");

    // Fetch documents
    useEffect(() => {
        dispatch(fetchDocumentsByAuthor());
    }, [dispatch]);

    // Handle delete
    const handleDelete = (id) => {
        dispatch(deleteDocument(id));
    };

    // User
    const user = useSelector((state) => state.auth.user);
    console.log(user, "user");

    return (
        <div className="document-container">
            <p className="document-title">
                Welcome, {documents[0]?.author?.name || "Unknown User"}
            </p>
            <div className="document-list">
                {documents.length > 0 ? (
                    documents.map((doc) => (
                        <div key={doc._id} className="document-card">
                            <div>
                                <span className="doc-title">{doc.title}</span>
                                <span className="doc-meta">Author: {doc.author?.name || "Unknown Author"}</span>
                                <span className="doc-meta">Created: {new Date(doc.createdAt).toLocaleString()}</span>
                                <span className="doc-meta">Updated: {new Date(doc.updatedAt).toLocaleString()}</span>
                                <span className="doc-meta">Visibility: {doc.visibility}</span>
                            </div>
                            <div className="document-actions">
                                <button
                                    className="edit-button"
                                    onClick={() => {
                                        setSelectedDocument(doc);
                                        setOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(doc._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No documents found.</p>
                )}
            </div>
        </div>
    );
}

export default AuthorDocument;