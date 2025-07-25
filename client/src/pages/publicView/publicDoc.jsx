import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./publicDoc.css";

function PublicDocument() {
    const {id} = useParams();
    const navigate = useNavigate();

    // Local state to store the fetched document
    const [document, setDocument] = useState(null);

    useEffect(() => {
        // Fetch individual public document based on ID
        const fetchDoc = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/docs/getpublic/${id}`);
                setDocument(response.data.data);
            } catch (err) {
                console.error("Error fetching document:", err);
            }
        };

        fetchDoc();
    }, [id]);

    // If no document was fetched
    if (!document) return <div className="doc-container">Document not found.</div>;

    return (
        <div className="doc-container">
            {/* Go back to listing */}
            <button className="go-back-button" onClick={() => navigate(-1)}>← Go Back</button>

            {/* Title */}
            <h1 className="doc-title">{document.title}</h1>

            {/* Author */}
            <p className="doc-author">By {document.author?.name || "Anonymous"}</p>

            {/* Creation Date */}
            <p className="doc-date">
                Created on: {new Date(document.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })}
            </p>

            {/* Last Updated Date (if different from created) */}
            {document.updatedAt !== document.createdAt && (
                <p className="doc-meta">
                    Last Updated: {new Date(document.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}
                </p>
            )}

            {/* Document Content */}
            <div className="doc-content">{document.content}</div>
        </div>
    );
}

export default PublicDocument;
