import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { signIn } from "reducers/actions/auth.actions";
import { getTranslationStr } from 'utils/data.util';
import formsState from "mocks/forms/initial-state";

import CommonMessage from "components/common/CommonMessage";

const SignInForm = ({ backToSignUpMode }) => {
  const dispatch = useDispatch();
  const { translations, activeLanguage, errorOnAuth } = useSelector(
    ({ auth, ui }) => ({
      ...auth,
      ...ui,
    })
  );
  const [values] = useState(formsState.signInFields);

  const submitForm = (values, { setSubmitting }) => {
    dispatch(signIn(values, dispatch));
    setSubmitting(false);
  };

  const validateForm = values => {
    const errors = {};

    if (!values.emailOrUsername?.length) {
      errors.email = 'Required';
    }

    if (!values.password?.length) {
      errors.password = 'Required';
    }

    return errors;
  };

  return (
    <div className="sign-in-form__container">
      <h1 className="sign-in__title">{translations[getTranslationStr('sign_items.sign_in.title', activeLanguage)]}</h1>
      <Formik
        initialValues={values}
        onSubmit={submitForm}
        validate={validateForm}
        validateOnChange={false}
      >
        {({ handleBlur, handleSubmit, getFieldProps, errors }) => (
          <form onSubmit={handleSubmit} className="sign-in-form" noValidate>
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
              {errors.email && <CommonMessage text={errors.email} theme="error-message" />}
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
              {errors.password && <CommonMessage text={errors.password} theme="error-message" />}
            </div>
            <button
              type="submit"
              disabled={Object.keys(errors)?.length}
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
            {errorOnAuth && <CommonMessage text={errorOnAuth} theme="error-message" />}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
