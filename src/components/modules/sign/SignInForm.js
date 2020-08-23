import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import { signIn } from 'reducers/actions/users.actions';

const SignInForm = ({ backToSignUpMode, history }) => {
    const { isLoggedIn } = useSelector(({ auth }) => auth || {});
    const [values] = useState({
        username: '',
        password: '',
    });
    const dispatch = useDispatch();
    const submitForm = (values, { setSubmitting }) => {
        dispatch(signIn(values, dispatch));
        setSubmitting(true);
    };

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/profile');
        }
    }, [isLoggedIn]);

    return (
        <div className="sign-in-form-container">
            <h1 className="sign-in-text">Log in into account</h1>
            <Formik
                initialValues={values}
                onSubmit={submitForm}
                >
                {({
                    values,
                    handleBlur,
                    handleSubmit,
                    getFieldProps,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} className="sign-in-form">
                        <div className="form-field">
                            <input
                                className="common-input"
                                type="username"
                                name="username"
                                id="username"
                                placeholder={'Username'}
                                onBlur={handleBlur}
                                {...getFieldProps('username')}
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
                        <div className="sign-in-link">
                            <span>If you want to<button className="btn-link" onClick={backToSignUpMode}>Sign up</button></span>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SignInForm;
