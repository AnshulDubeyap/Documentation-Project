import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./privateDoc.css";

function PrivateDocument() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:5000/api/docs/getprivate/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );
                setDocument(response.data.data);
            } catch (error) {
                console.error("Error fetching private document:", error);
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
            <button className="go-back-button" onClick={() => navigate(-1)}>
                ← Go Back
            </button>

            <h1 className="doc-title">{document.title}</h1>
            <p className="doc-author">By {document.author?.name || "Unknown Author"}</p>

            <p className="doc-date">
                Created:{" "}
                {new Date(document.createdAt).toLocaleDateString("en-US")}
            </p>

            {document.updatedAt !== document.createdAt && (
                <p className="doc-date">
                    Updated:{" "}
                    {new Date(document.updatedAt).toLocaleDateString("en-US")}
                </p>
            )}
            {document.tags && document.tags.length > 0 && (
                <div style={{marginTop: "20px"}}>
                    <h4 style={{marginBottom: "8px", fontWeight: "bold"}}>Tagged Users:</h4>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                        {document.tags.map((tag, index) => (
                            <span
                                key={index}
                                style={{
                                    display: "inline-block",
                                    backgroundColor: "#f0f0f0",
                                    color: "#333",
                                    padding: "4px 10px",
                                    borderRadius: "16px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                                    marginBottom: "10px"
                                }}
                            >
                    {typeof tag === "object" && tag.name ? tag.name : tag.toString()}
                </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="doc-content">{document.content}</div>
        </div>
    );
}

export default PrivateDocument;
