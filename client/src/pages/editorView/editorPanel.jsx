import {Button} from '../../components/ui/button';
import {FileText} from 'lucide-react';
import "./editorPanel.css";
import {Sheet, SheetContent, SheetTrigger} from "../../components/ui/sheet";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUsers} from "../../store/user-slice";
import {createDocument} from "../../store/docs-slice";
import {toast} from "sonner";
import AuthorDocument from "../../components/editorView/editorDocument.jsx";
import axios from "axios";

function EditorPanel() {
    // State for sheet
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    // State for edit document
    const [selectedDocument, setSelectedDocument] = useState(null);


    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    // Get all users
    const allUsers = useSelector((state) => state.user.allUsers);
    console.log(allUsers, "allUsers");

    // Get current user
    const user = useSelector((state) => state.auth.user);
    console.log(user, "user");

    return (
        <div className="editor-panel">
            <Sheet open={open} onOpenChange={(val) => {
                setOpen(val);
                if (!val) setSelectedDocument(null); // Clear form state when sheet is closed
            }}>
                <SheetTrigger asChild>
                    <Button className="create-button" onClick={() => setOpen(true)}>
                        <FileText/>
                        <span
                            className="create-text">Create a new document</span>
                    </Button>
                </SheetTrigger>

                <SheetContent side="right">
                    <div className="form-container">
                        <p className="form-title"> {selectedDocument ? "Edit Document" : "Create a New Document"}</p>

                        <Formik
                            enableReinitialize
                            initialValues={{
                                title: selectedDocument?.title || "",
                                content: selectedDocument?.content || "",
                                visibility: selectedDocument?.visibility || "private",
                                tags: selectedDocument?.tags || [],
                                author: user?._id || ""
                            }}
                            validationSchema={Yup.object({
                                title: Yup.string().required("Title is required"),
                                content: Yup.string().required("Content is required"),
                                visibility: Yup.string().required("Visibility is required"),
                                tags: Yup.array()
                            })}
                            onSubmit={async (values, {resetForm}) => {
                                try {
                                    if (selectedDocument) {
                                        // Edit flow
                                        const res = await axios.put(
                                            `http://localhost:5000/api/docs/update/${selectedDocument._id}`,
                                            values,
                                            {withCredentials: true}
                                        );

                                        toast("Document updated successfully", {variant: "success"});
                                    } else {
                                        // Create flow
                                        const res = await dispatch(createDocument(values));
                                        toast("Document created successfully", {variant: "success"});
                                    }

                                    resetForm();
                                    setSelectedDocument(null);
                                    setOpen(false);
                                } catch (error) {
                                    toast("Failed", {
                                        description: error?.message || "Something went wrong",
                                        variant: "destructive",
                                    });
                                }
                            }}
                        >
                            {({values, setFieldValue}) => {
                                const handleVisibilityChange = (event) => {
                                    const value = event.target.value;
                                    setFieldValue("visibility", value);
                                    if (value === "public") {
                                        setFieldValue("tags", []);
                                    }
                                };

                                return (
                                    <Form>
                                        <label htmlFor="title">Title</label>
                                        <Field name="title" type="text"/>
                                        <ErrorMessage name="title" component="div" className="error"/>

                                        <label htmlFor="content">Content</label>
                                        <Field name="content" as="textarea" rows="8"/>
                                        <ErrorMessage name="content" component="div" className="error"/>

                                        <label>Visibility</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="visibility"
                                                    value="public"
                                                    checked={values.visibility === "public"}
                                                    onChange={handleVisibilityChange}
                                                />
                                                Public
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="visibility"
                                                    value="private"
                                                    checked={values.visibility === "private"}
                                                    onChange={handleVisibilityChange}
                                                />
                                                Private
                                            </label>
                                        </div>
                                        <ErrorMessage name="visibility" component="div" className="error"/>

                                        {/* Only show tags when private */}
                                        {values.visibility === "private" && (
                                            <>
                                                <label>Tag Users (optional)</label>
                                                <div className="checkbox-group">
                                                    {allUsers.map((u) => {
                                                        const isTagged = values.tags.includes(u._id);
                                                        return (
                                                            <label key={u._id}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isTagged}
                                                                    onChange={() => {
                                                                        const updated = isTagged
                                                                            ? values.tags.filter((id) => id !== u._id)
                                                                            : [...values.tags, u._id];
                                                                        setFieldValue("tags", updated);
                                                                    }}
                                                                />
                                                                {u.name}
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}

                                        <Button className="submit-button"
                                                type="submit">{selectedDocument ? "Update" : "Create"}</Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </SheetContent>
            </Sheet>
            <AuthorDocument setSelectedDocument={setSelectedDocument} setOpen={setOpen}/>
        </div>

    );
}

export default EditorPanel;
