import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { signIn } from 'reducers/actions/users-actions';

const SignInForm = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        is_professional: false,
    })
    const dispatch = useDispatch();
    const submitForm = (values, { setSubmitting }) => {
        dispatch(signIn());
        // setSubmitting(false);
    };
    const validateForm = values => {
        const errors = {};
        if (!values.email) {
        errors.email = 'Required';
        } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
        errors.email = 'Invalid email address';
        }
        return errors;
    };

    return (
        <div className="sign-in-form-container">
            <p>Log in into account</p>
            <Formik
                initialValues={values}
                validate={validateForm}
                onSubmit={submitForm}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className="sign-in-form">
                        <div className="form-field">
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </div>
                        <div className="form-errors-container">
                            {errors.password && touched.password && errors.password}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-submit"
                        >Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SignInForm;
