import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {fetchPublicDocuments} from "../../store/docs-slice"; // Adjust path
import {Button} from "../../components/ui/button"; // Adjust path
import "./publicListing.css"; // Correct CSS file

function PublicListing() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get public docs from Redux store
    const documents = useSelector((state) => state.docs.publicDocuments || []);
    console.log("🌍 Public docs:", documents); // Log the fetched public documents

    // Fetch public docs on mount
    useEffect(() => {
        console.log("🌍 Fetching public documents...");
        dispatch(fetchPublicDocuments());
    }, [dispatch]);

    return (
        <div className="public-docs-container">
            <h2 className="page-title">Explore Public Documents</h2>

            <div className="document-flex">
                {documents.length > 0 ? (
                    documents.map((doc) => (
                        <div key={doc._id} className="public-doc-card">
                            <div className="doc-header">
                                <h3 className="doc-title">{doc.title}</h3>
                                <p className="doc-meta">Author: {doc.author?.name || "Unknown Author"}</p>
                                <p className="doc-meta">Created: {new Date(doc.createdAt).toLocaleString()}</p>
                                <p className="doc-meta">Visibility: {doc.visibility}</p>
                            </div>
                            <div className="doc-body">
                                <p className="doc-preview">
                                    {doc.content && doc.content.length > 120
                                        ? doc.content.slice(0, 120) + "..."
                                        : doc.content || "No content available"}
                                </p>
                            </div>
                            <div className="doc-footer">
                                <Button
                                    variant="outline"
                                    className="read-more-btn"
                                    onClick={() => navigate(`/public/document/${doc._id}`)}
                                >
                                    Read More...
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-docs">No public documents available.</p>
                )}
            </div>
        </div>
    );
}

export default PublicListing;