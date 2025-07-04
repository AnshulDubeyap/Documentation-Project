import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import "./login.css";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function AuthLogin() {

    // Dispatch
    const dispatch = useDispatch();

    // Navigate
    const navigate = useNavigate();

    // Initial Values
    const initialValues = {
        email: '',
        password: ''
    };
    // Validation Schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Required')
    });
    // On Submit
    const onSubmit = (values, {setSubmitting}) => {
        console.log('Login data:', values);

    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({isSubmitting}) => (
                    <Form className="login-form">
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

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AuthLogin



