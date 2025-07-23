import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./publicDoc.css";

function PublicDocument() {
    const {id} = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const response = await axios.get(`/api/docs/getpublic/${id}`);
                setDocument(response.data.data);
            } catch (err) {
                console.error("Error fetching document:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoc();
    }, [id]);

    if (loading) return <div className="doc-container">Loading...</div>;
    if (!document) return <div className="doc-container">Document not found.</div>;

    return (
        <div className="doc-container">
            <h1 className="doc-title">{document.title}</h1>
            <p className="doc-author">By {document.author?.name || "Anonymous"}</p>
            <div className="doc-content">{document.content}</div>
        </div>
    );
}

export default PublicDocument;
