import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {fetchPrivateDocuments} from "../../store/docs-slice";
import {Button} from "../../components/ui/button";
import "./privateListing.css";

function PrivateListing() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const documents = useSelector((state) => state.docs.privateDocuments || []);
    const currentUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchPrivateDocuments());
    }, [dispatch]);

    return (
        <div className="private-docs-container">
            <h2 className="page-title">My Private Documents</h2>

            <div className="document-flex">
                {documents.length > 0 ? (
                    documents.map((doc) => (
                        <div key={doc._id} className="private-doc-card">
                            <div className="doc-header">
                                <h3 className="doc-title">{doc.title}</h3>
                                <p className="doc-meta">Author: {doc.author?.name || "Unknown Author"}</p>
                                <p className="doc-meta">Created: {new Date(doc.createdAt).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}</p>
                                {doc.updatedAt !== doc.createdAt && (
                                    <p className="doc-meta">
                                        Last Updated: {new Date(doc.updatedAt).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                    </p>
                                )}
                                <p className="doc-meta">Visibility: {doc.visibility}</p>
                                {doc.tags && doc.tags.length > 0 && (
                                    <p className="doc-meta">
                                        Tags: {doc.tags.map((tag, index) =>
                                        typeof tag === "object" && tag.name
                                            ? tag.name
                                            : tag.toString()
                                    ).join(", ")}
                                    </p>
                                )}
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
                                    onClick={() =>
                                        navigate(`/private/document/${doc._id}`)
                                    }
                                >
                                    Read More...
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-docs">No private documents found.</p>
                )}
            </div>
        </div>
    );
}

export default PrivateListing;
