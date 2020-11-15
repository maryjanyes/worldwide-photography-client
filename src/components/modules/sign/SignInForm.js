import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { signIn } from "reducers/actions/auth.actions";
import { getTranslationStr } from 'utils/data.util';

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
      history.push("/profile-settings");
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
                type="text"
                name="email"
                id="email"
                placeholder={translations[getTranslationStr("forms.common.email", activeLanguage)]}
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
                autoComplete="password"
                placeholder={translations[getTranslationStr("forms.common.password", activeLanguage)]}
                onBlur={handleBlur}
                {...getFieldProps("password")}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-submit"
            >
              {translations[getTranslationStr("common.button_actions.submit", activeLanguage)]}
            </button>
            <div className="sign-in-link">
              <span>
                {translations[getTranslationStr("common.forms.sign_in.get_sign_up", activeLanguage)]}
                <button className="btn-link" onClick={backToSignUpMode}>
                  {translations[getTranslationStr("common.button_actions.sign_up", activeLanguage)]}
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
