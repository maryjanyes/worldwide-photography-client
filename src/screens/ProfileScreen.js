import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";

import UploadInput from 'components/common/CommonUploadInput';
import GalleryPhoto from 'components/modules/gallery/GalleryPhoto';

import { getTranslationStr, getPhotosForAccount, pathToPhoto } from 'utils/data.util';

const initialFormState = {
  alias: "",
  username: "",
  avatar_path: "",
  password: "",
  first_name: "",
  email: "",
  birthday_date: "",
};

const ProfileScreen = () => {
  const { userData, isLoggedIn, translations, activeLanguage, photoSubmittions } = useSelector((
    { auth, ui, photos }) => ({ ...auth, ...ui, ...photos }));
  const canDisplay = false;
  
  const [myPhotos, setMyPhotos] = useState([]);
  const [myPhotoUrl, setMyPhotoUrl] = useState(pathToPhoto(userData?.avatar_path, null, true));
  const [values] = useState(userData || initialFormState);

  useEffect(() => {
    const userPhotos = getPhotosForAccount(photoSubmittions, userData?.user_id);
    if (userPhotos && userPhotos.length > 0) {
      setMyPhotos(userPhotos);
    }
  }, [photoSubmittions, userData]);

  const submitForm = ({ }, values) => {
    // TODO Submit form.
  };

  return isLoggedIn && canDisplay && (
    <div className="page page-profile">
      <h1>{translations[getTranslationStr('pages.profile_page.title', activeLanguage)]}</h1>
      <Formik initialValues={values}>
      {({ getFieldProps, handleChange, isSubmitting }) => (
        <form className="page-profile-form">
          <div className="form-field">
            <label>{translations[getTranslationStr("forms.common.username", activeLanguage)]}</label>
            <input
              className="common-input"
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              {...getFieldProps("username")}
            />
          </div>
          <div className="form-field">
            <label>{translations[getTranslationStr("forms.common.alias", activeLanguage)]}</label>
            <input
              className="common-input"
              type="text"
              name="alias"
              id="alias"
              onChange={handleChange}
              {...getFieldProps("alias")}
            />
          </div>
          <div className="form-field">
            <label>{translations[getTranslationStr("forms.common.first_name", activeLanguage)]}</label>
            <input
              className="common-input"
              type="text"
              name="first_name"
              id="first_name"
              onChange={handleChange}
              {...getFieldProps("alias")}
            />
          </div>
          <div className="form-field">
            <label>{translations[getTranslationStr("forms.common.profile_photo", activeLanguage)]}</label>
            <UploadInput onChangePhotoUrl={event => setMyPhotoUrl(event.target?.value)} photoUrl={myPhotoUrl} />
          </div>
          <div className="form-field">
            <label>{translations[getTranslationStr("forms.common.password", activeLanguage)]}</label>
            <input
              className="common-input"
              type="password"
              name="password"
              id="password"
              placeholder={translations["sign_in_form.password.en"]}
              onChange={handleChange}
              {...getFieldProps("password")}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-submit"
            onClick={submitForm}
          >
            {translations[getTranslationStr("common.button_actions.submit", activeLanguage)]}
          </button>
        </form>
      )}
      </Formik>
      <div className="page-profile__photos">
        {myPhotos.map(photo => <GalleryPhoto {...photo} />)}
      </div>
    </div>
  ) || (<div className="page page-profile">
         <span>Page at progress.</span>
       </div>)
};

export default ProfileScreen;
