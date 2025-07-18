import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import './register.css';
import {useDispatch} from "react-redux";
import {registerUser} from "../../store/auth-slice";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "sonner";

const validRoles = ['user', 'editor']; // Only public roles

const AuthRegister = () => {
    // Dispatch
    const dispatch = useDispatch();

    // Navigate
    const navigate = useNavigate();

    // Initial Values
    const initialValues = {
        name: '',
        email: '',
        password: '',
        role: ''
    };

    // Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().min(2, 'Too short').max(30, 'Too long').required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
        role: Yup.string()
            .oneOf(validRoles, 'Invalid role')
            .required('Role is required')
    });

    // On Submit
    const onSubmit = (values, {setSubmitting}) => {
        console.log('Register data:', values);
        dispatch(registerUser(values)) //! Dispatch the registerUser action with values
            .then((data) => {
                if (data?.payload?.success) {

                    // Show success message
                    toast("Success", {
                        description: data?.payload?.message || "Registered successfully",
                        variant: "success",
                    });

                    // Redirect to login
                    navigate("/auth/login");

                } else {
                    // Show error message
                    toast("Registration Failed", {
                        description: data?.payload?.message || "Something went wrong",
                        variant: "destructive",
                    });
                }
            })
            .catch((error) => {
                toast("Error", {
                    description: error?.response?.data?.message || "Something went wrong",
                    variant: "destructive",
                });
                console.error("Registration failed:", error);
            })
            .finally(() => {
                setSubmitting(false); //! Formik: Reset the submit button after request
            });
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({isSubmitting}) => (
                    <Form className="register-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" className="form-input"/>
                            <ErrorMessage name="name" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" className="form-input"/>
                            <ErrorMessage name="email" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" className="form-input"/>
                            <ErrorMessage name="password" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <Field as="select" name="role" className="form-input">
                                <option value="">Select a role</option>
                                <option value="user">User</option>
                                <option value="editor">Editor</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="error"/>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>

            {/* Register Link */}
            <div className="register-redirect">
                Already have an account? <Link to="/auth/login" className="register-link">Login here</Link>
            </div>
        </div>
    );
};

export default AuthRegister;
