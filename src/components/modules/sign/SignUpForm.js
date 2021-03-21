import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import { signUp, resetSignError } from "reducers/actions/auth.actions";
import { getTranslationStr } from 'utils/data.util';

import CommonCheckbox from "components/common/CommonCheckbox";
import CommonMessage from "components/common/CommonMessage";

import formsState from "mocks/forms/initial-state";

const SignUpForm = ({ switchToSignInMode, history }) => {
  const { isLoggedIn, translations, activeLanguage, errorOnAuth } = useSelector(({ auth, ui }) => ({ ...auth, ...ui }));
  const [values] = useState(formsState.signUpFields);
  const dispatch = useDispatch();

  const submitForm = (values, { setSubmitting }) => {
    if (values.password === values.repeatPassword) {
      values.photographer_level = (values.isPro && "Pro") || "Beginner";
      delete values.repeatPassword;
      delete values.isPro;
      dispatch(resetSignError());
      dispatch(signUp(values, dispatch));
    }
    setSubmitting(false);
  };

  const validateForm = values => {
    const errors = {};
    if (!values.email) {
      errors.email = translations[getTranslationStr("common.forms_validation.required", activeLanguage)];
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = translations[getTranslationStr("common.forms_validation.email", activeLanguage)];
    }

    if (!values.userName.length) {
      errors.userName = translations[getTranslationStr("common.forms_validation.required", activeLanguage)];
    }

    if (values.password.length === 0 || values.repeatPassword.length === 0) {
      errors.password = translations[getTranslationStr("common.forms_validation.required", activeLanguage)];
    } else if (values.password !== values.repeatPassword) {
      errors.password = translations[getTranslationStr("common.forms_validation.passwords_do_not_matched", activeLanguage)];
    }
  
    return errors;
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/profile-settings");
    }
  }, [isLoggedIn]);

  return (
    <div className="sign-up-form__container">
      <h1 className="sign-up__title">{translations[getTranslationStr('sign_items.sign_up.title', activeLanguage)]}</h1>
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
          errors,
        }) => (
          <form onSubmit={handleSubmit} className="sign-up-form">
            <div className="form-field">
              <input
                className="common-input"
                type="text"
                name="user_name"
                id="user_name"
                placeholder={translations[getTranslationStr("forms.common.first_name", activeLanguage)]}
                onBlur={handleBlur}
                {...getFieldProps("userName")}
              />
              {errors.userName && <CommonMessage theme="error-message" text={errors.userName} />}
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
               {errors.email && <CommonMessage theme="error-message" text={errors.email} />}
            </div>
            <div className="form-field">
              <input
                className="common-input"
                type="password"
                name="password"
                id="password"
                placeholder={translations[getTranslationStr("forms.common.password", activeLanguage)]}
                onBlur={handleBlur}
                {...getFieldProps("password")}
              />
              {errors.password && <CommonMessage theme="error-message" text={errors.password} />}
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
              label={translations[getTranslationStr('sign_items.sign_up.is_pro', activeLanguage)]}
              isChecked={values.isPro}
              onChange={value => setFieldValue("isPro", value)}
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
            {errorOnAuth && <CommonMessage text={errorOnAuth} theme="error-message" />}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
