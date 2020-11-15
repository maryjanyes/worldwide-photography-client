import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { signUp } from "reducers/actions/auth.actions";
import { getTranslationStr } from 'utils/data.util';

import CommonCheckbox from "components/common/CommonCheckbox";

const SignUpForm = ({ switchToSignInMode, history }) => {
  const { isLoggedIn, translations, activeLanguage } = useSelector(({ auth, ui }) => ({ ...auth, ...ui }));
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
      history.push("/profile-settings");
    }
  }, [isLoggedIn]);

  return (
    <div className="sign-up-form-container">
      <h1 className="sign-up-text">Create account</h1>
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
          values,
        }) => (
          <form onSubmit={handleSubmit} className="sign-up-form">
            <div className="form-field">
              <input
                className="common-input"
                type="text"
                name="first_name"
                id="first_name"
                placeholder={translations[getTranslationStr("forms.common.first_name", activeLanguage)]}
                onBlur={handleBlur}
                {...getFieldProps("first_name")}
              />
            </div>
            <div className="form-field">
              <input
                className="common-input"
                type="email"
                name="email"
                id="email"
                placeholder={translations[getTranslationStr("forms.common.email", activeLanguage)]}
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
                autoComplete="password"
                placeholder={translations[getTranslationStr("forms.common.password", activeLanguage)]}
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
                autoComplete="repeatPassword"
                placeholder={translations[getTranslationStr("forms.common.repeat_password", activeLanguage)]}
                onBlur={handleBlur}
                {...getFieldProps("repeatPassword")}
              />
            </div>
            <CommonCheckbox
              name="isPro"
              label="You are Pro?"
              isChecked={values.isPro}
              onChange={(value) => setFieldValue("isPro", value)}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-submit"
            >
              {translations[getTranslationStr("common.button_actions.submit", activeLanguage)]}
            </button>
            <div className="sign-up-link">
              <span>
                {translations[getTranslationStr("common.forms.sign_up.get_sign_in", activeLanguage)]}
                <button className="btn-link" onClick={switchToSignInMode}>
                  {translations[getTranslationStr('common.button_actions.sign_in', activeLanguage)]}
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
