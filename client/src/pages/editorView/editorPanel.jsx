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

function EditorPanel() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

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
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button className="create-button" onClick={() => setOpen(true)}>
                        <FileText/>
                        <span className="create-text">Create Document</span>
                    </Button>
                </SheetTrigger>

                <SheetContent side="right">
                    <div className="form-container">
                        <p className="form-title">Create a new document</p>

                        <Formik
                            initialValues={{
                                title: "",
                                content: "",
                                visibility: "private",
                                tags: [],
                                author: user?._id || ""
                            }}
                            validationSchema={Yup.object({
                                title: Yup.string().required("Title is required"),
                                content: Yup.string().required("Content is required"),
                                visibility: Yup.string().required("Visibility is required"),
                                tags: Yup.array()
                            })}
                            onSubmit={(values, {resetForm}) => {
                                console.log(values, "values");

                                dispatch(createDocument(values))
                                    .then((res) => {
                                        toast("Success", {
                                            description: res?.payload?.message || "Document created successfully",
                                            variant: "success",
                                        });
                                        resetForm();
                                        setOpen(false);
                                    })
                                    .catch((error) => {
                                        toast("Failed", {
                                            description: error?.message || "Something went wrong",
                                            variant: "destructive",
                                        });
                                        console.error("Error creating document:", error);
                                    });
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

                                        <Button className="submit-button" type="submit">Create</Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default EditorPanel;
