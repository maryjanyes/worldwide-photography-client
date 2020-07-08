import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { signUp } from 'reducers/actions/users-actions';

const SignUpForm = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        is_professional: false,
    })
    const dispatch = useDispatch();
    const submitForm = (values, { setSubmitting }) => {
        dispatch(signUp());
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
        <div className="sign-up-form-container">
            <p>Create account</p>
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
                    <form onSubmit={handleSubmit} className="sign-up-form">
                        <div className="form-field">
                            <input
                                className="common-input"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                className="common-input"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                className="common-input"
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
                        <div className="sign-up-link">
                            <span>If you already have account you probably want to</span>
                            <Link to="/sign-in"> log in</Link>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SignUpForm;