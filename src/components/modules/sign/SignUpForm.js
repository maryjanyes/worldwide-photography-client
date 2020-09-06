import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { signUp } from "reducers/actions/auth.actions";

import CommonCheckbox from "components/common/CommonCheckbox";

const SignUpForm = ({ switchToSignInMode, history }) => {
  const { isLoggedIn } = useSelector(({ auth }) => auth || {});
  const [values] = useState({
    name: "",
    email: "",
    password: "",
    isPro: false,
    repeatPassword: "",
  });
  const dispatch = useDispatch();
  const submitForm = (values, { setSubmitting }) => {
    if (values.password === values.repeatPassword) {
      values.photographer_level = (values.isPro && "Pro") || "Beginner";
      delete values.repeatPassword;
      dispatch(signUp(values, dispatch));
    }
    setSubmitting(false);
  };
  const validateForm = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/profile");
    }
  }, [isLoggedIn]);

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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="sign-up-form">
            <div className="form-field">
              <input
                className="common-input"
                type="text"
                name="name"
                id="name"
                placeholder={"Name"}
                onBlur={handleBlur}
                {...getFieldProps("name")}
              />
            </div>
            <div className="form-field">
              <input
                className="common-input"
                type="email"
                name="email"
                id="email"
                placeholder={"Email"}
                onBlur={handleBlur}
                {...getFieldProps("email")}
              />
            </div>
            <div className="form-field">
              <input
                className="common-input"
                type="password"
                name="password"
                id="password"
                placeholder={"Password"}
                onBlur={handleBlur}
                {...getFieldProps("password")}
              />
            </div>
            <div className="form-field">
              <input
                className="common-input"
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                placeholder={"Repeat Password"}
                onBlur={handleBlur}
                {...getFieldProps("repeatPassword")}
              />
            </div>
            <CommonCheckbox
              name="isPro"
              label="You are Pro?"
              onChange={(value) => setFieldValue("isPro", value)}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-submit"
            >
              Sign Up
            </button>
            <div className="sign-up-link">
              <span>
                If you already have account you probably want to
                <button className="btn-link" onClick={switchToSignInMode}>
                  Sign in
                </button>
              </span>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
