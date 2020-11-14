import React from "react";
import { useSelector } from "react-redux";

import UploadInput from '../components/common/UploadInput'

const ProfileScreen = () => {
  const { userData, isLoggedIn } = useSelector(({ auth }) => auth);

  return isLoggedIn && (
    <div className="page-profile">
      <h1>Personal profile</h1>
      <div className="page-profile__profile-info">
        <p>Profile info</p>
        <div className="page-profile_profile-info__section">
          <label>Alias</label>
          <input
                className="common-input"
                type="text"
                name="email"
                id="email"
                // placeholder={translations["sign_in_form.password.en"]}
                // onBlur={handleBlur}
                value={userData?.email}
          />
        </div>
        <div className="page-profile_profile-info__section">
          <label>Profile image</label>
          <UploadInput onChangePhotoUrl={() => {}} containerStyle={{}} />
        </div>
        <div className="page-profile_profile-info__section">
          <label>Update password</label>
          <input
                className="common-input"
                type="password"
                name="password"
                id="password"
                // placeholder={translations["sign_in_form.password.en"]}
                // onBlur={handleBlur}
                value={userData?.email}
          />
        </div>
      </div>
      <div className="page-profile__profile-photos">
        <div>
          <span>Profile info photo</span>
        </div>
        <div>
          <span>Profile info photo</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
