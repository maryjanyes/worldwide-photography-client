import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { signIn } from "reducers/actions/auth.actions";

const SignInForm = ({ backToSignUpMode, history }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, translations, activeLanguage } = useSelector(
    ({ auth, ui }) => ({
      ...auth,
      ...ui,
    })
  );
  const [values] = useState({
    emailOrUsername: "",
    password: "",
  });
  const submitForm = (values, { setSubmitting }) => {
    dispatch(signIn(values, dispatch));
    setSubmitting(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/profile");
    }
  }, [isLoggedIn]);

  return (
    <div className="sign-in-form-container">
      <h1 className="sign-in-text">Log in into account</h1>
      <Formik initialValues={values} onSubmit={submitForm}>
        {({ handleBlur, handleSubmit, getFieldProps, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="sign-in-form">
            <div className="form-field">
              <input
                className="common-input"
                type="username"
                name="username"
                id="username"
                placeholder={
                  translations[
                    `sign_in_form.email_or_username.${activeLanguage}`
                  ]
                }
                onBlur={handleBlur}
                {...getFieldProps("emailOrUsername")}
              />
            </div>
            <div className="form-field">
              <input
                className="common-input"
                type="password"
                name="password"
                id="password"
                placeholder={translations["sign_in_form.password.en"]}
                onBlur={handleBlur}
                {...getFieldProps("password")}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-submit"
            >
              Submit
            </button>
            <div className="sign-in-link">
              <span>
                If you want to
                <button className="btn-link" onClick={backToSignUpMode}>
                  Sign up
                </button>
              </span>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
