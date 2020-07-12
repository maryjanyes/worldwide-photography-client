import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { signUp } from 'reducers/actions/users.actions';

const SignUpForm = ({ switchToSignInMode }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        is_professional: false,
    })
    const dispatch = useDispatch();
    const submitForm = (values, { setSubmitting }) => {
        console.log(values)
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
            <h1 className="sign-in-text">Create account</h1>
            <Formik
                initialValues={values}
                validate={validateForm}
                onSubmit={submitForm}
            >
                {({
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    getFieldProps,
                }) => (
                    <form onSubmit={handleSubmit} className="sign-up-form">
                        <div className="form-field">
                            <input
                                className="common-input"
                                type="text"
                                name="name"
                                id="name"
                                placeholder={'Name'}
                                onBlur={handleBlur}
                                {...getFieldProps('name')}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                className="common-input"
                                type="email"
                                name="email"
                                id="email"
                                placeholder={'Email'}
                                onBlur={handleBlur}
                                {...getFieldProps('email')}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                className="common-input"
                                type="password"
                                name="password"
                                id="password"
                                placeholder={'Password'}
                                onBlur={handleBlur}
                                {...getFieldProps('password')}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-submit"
                        >Submit</button>
                        <div className="sign-up-link">
                            <span>
                                If you already have account you probably want to
                                <button className="btn-link" onClick={switchToSignInMode}>log in</button>.
                            </span>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SignUpForm;