import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";

import UploadInput from 'components/common/CommonUploadInput';
import GalleryPhoto from 'components/modules/gallery/GalleryPhoto';

import { getTranslationStr, getPhotosByUser } from 'utils/data.util';

const ProfileScreen = () => {
  const { userData, isLoggedIn, translations, activeLanguage, allPhotos } = useSelector((
    { auth, ui, photos }) => ({ ...auth, ...ui, ...photos }));

  const [myPhotos, setMyPhotos] = useState([]);
  const [myPhotoUrl, setMyPhotoUrl] = useState(userData?.avatar_path);
  const [values] = useState({
    alias: "",
    username: "",
    avatar_path: "",
    password: "",
    birthday_date: "",
  });

  useEffect(() => {
    const userPhotos = getPhotosByUser(allPhotos, userData?.user_id);
    if (userPhotos) {
      setMyPhotos(userPhotos);
    }
  }, [allPhotos, userData]);

  return isLoggedIn && (
    <div className="page-profile">
      <h1>Manage Profile</h1>
      <Formik initialValues={values}>
      {({ handleSubmit, getFieldProps, handleChange, isSubmitting }) => (
        <form className="page-profile-update-form">
          <div className="form-field update-profile-form-field">
            <label>{translations[getTranslationStr("forms.common.username", activeLanguage)]}</label>
            <input
              className="common-input"
              type="text"
              name="username"
              id="username"
              placeholder={translations["sign_in_form.password.en"]}
              onChange={handleChange}
              {...getFieldProps("username")}
            />
          </div>
          <div className="form-field update-profile-form-field">
            <label>{translations[getTranslationStr("forms.common.alias", activeLanguage)]}</label>
            <input
              className="common-input"
              type="text"
              name="alias"
              id="alias"
              placeholder={translations["sign_in_form.password.en"]}
              onChange={handleChange}
              {...getFieldProps("alias")}
            />
          </div>
          <div className="form-field">
            <label>{translations[getTranslationStr("forms.common.profile_photo", activeLanguage)]}</label>
            <UploadInput onChangePhotoUrl={newPath => setMyPhotoUrl(newPath)} photoUrl={myPhotoUrl} />
          </div>
          <div className="form-field update-profile-form-field">
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
            onClick={handleSubmit}
          >
            {translations[getTranslationStr("common.button_actions.submit", activeLanguage)]}
          </button>
        </form>
      )}
      </Formik>
      <div className="page-profile-photos">
        {myPhotos.map(photo => <GalleryPhoto {...photo} />)}
      </div>
    </div>
  );
};

export default ProfileScreen;
