import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import './register.css';

const validRoles = ['user', 'editor']; // Only public roles

const AuthRegister = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        role: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().min(2, 'Too short').max(30, 'Too long').required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
        role: Yup.string()
            .oneOf(validRoles, 'Invalid role')
            .required('Role is required')
    });

    const onSubmit = (values, {setSubmitting}) => {
        console.log('Register data:', values);
        setSubmitting(false);
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
        </div>
    );
};

export default AuthRegister;
