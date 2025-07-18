import {Button} from '../../components/ui/button';
import {FileText} from 'lucide-react';
import "./editorPanel.css"
import {Sheet, SheetContent, SheetTrigger} from "../../components/ui/sheet";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUsers} from "../../store/user-slice";

function EditorPanel() {
    // state to open and close the sheet
    const [open, setOpen] = useState(false);

    // Using dispatch and useEffect to get the userArray
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    // using useSelector to get the userArray
    const allUsers = useSelector((state) => state.user.allUsers);

    return (
        <div className="editor-panel">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button className="create-button" onClick={() => {
                        setOpen(true);
                    }}>
                        <FileText/>
                        <span className="create-text">Create Document</span>
                    </Button>
                </SheetTrigger>

                <SheetContent side="right">
                    <div className="form-container">
                        <p className="form-title">Create a new document</p>
                        <Formik
                            initialValues={{title: "", content: "", visibility: "private", tags: []}}
                            validationSchema={Yup.object({
                                title: Yup.string().required("Title is required"),
                                content: Yup.string().required("Content is required"),
                                visibility: Yup.string().required("Visibility is required"),
                                tags: Yup.array().required("Tags are required")
                            })}
                            onSubmit={() => {
                            }}>
                            {({values, setFieldValue}) => (
                                <Form>
                                    {/* Title */}
                                    <label htmlFor="title">Title</label>
                                    <Field name="title" type="text"/>
                                    <ErrorMessage name="title" component="div" className="error"/>

                                    {/* Content */}
                                    <label htmlFor="content">Content</label>
                                    <Field name="content" as="textarea" rows="8"/>
                                    <ErrorMessage name="content" component="div" className="error"/>

                                    {/* Visibility */}
                                    <label>Visibility</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <Field type="radio" name="visibility" value="public"/>
                                            Public
                                        </label>
                                        <label className="radio-label">
                                            <Field type="radio" name="visibility" value="private"/>
                                            Private
                                        </label>
                                    </div>

                                    {/* Tag Users */}
                                    <label>Tag Users</label>
                                    <div className="checkbox-group">
                                        {allUsers.map((user) => (
                                            <label key={user.id}>
                                                <input
                                                    type="checkbox"
                                                    name="tags"
                                                    value={user.id}
                                                    checked={values.tags.includes(user.id)}
                                                    onChange={() => {
                                                        const set = new Set(values.tags);
                                                        set.has(user.id)
                                                            ? set.delete(user.id)
                                                            : set.add(user.id);
                                                        setFieldValue("tags", Array.from(set));
                                                    }}
                                                />
                                                {user.name}
                                            </label>
                                        ))}
                                    </div>
                                    <Button className="submit-button" type="submit" onsubmit={() => {
                                        setOpen(false);
                                    }}>Create</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default EditorPanel;