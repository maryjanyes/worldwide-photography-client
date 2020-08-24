import React, { useState } from "react";
import { useSelector } from "react-redux";

import { apiService } from "services/api.service";

const ApplyContestForm = ({ children, isPhotoUploaded, image }) => {
  const { isLoggedIn, userData, lastUploadedImage } = useSelector(
    ({ users, contests }) => ({
      ...users,
      ...contests,
    })
  );
  const [contestFormFields, setContestFormFields] = useState({});
  const submitContestForm = async () => {
    const contestFileData = new FormData();
    contestFileData.append("file", image);
    contestFileData.append("userName", userData.userName);
    const insertContestImageResponse = await apiService.insertBlob(
      contestFileData
    );
    console.log(insertContestImageResponse);
    if (insertContestImageResponse.success) {
      const photoData = {
        author_id: userData.userID,
        cetegory_id: 1,
        link_to_file: insertContestImageResponse.fileName,
        camera_details_id: 0,
      };
      const insertPhotoResponse = await apiService.insertData(
        photoData,
        "photos/submitPhoto"
      );
      /* const contestData = {
            photo_id: insertContestImageResponse
        }
        const insertContestResponse = await apiService.insertData(); */
    }
  };
  const onChange = (change) => {
    setContestFormFields({
      ...contestFormFields,
      [change.target.name]: change.target.value,
    });
  };

  return (
    <form className="submit-photo-form">
      {isPhotoUploaded &&
        (isLoggedIn ? (
          <div>
            <div className="submit-photo-form-field">
              <label>Describe photo in few words</label>
              <input id="photo-desc" name="imageDesc" onChange={onChange} />
            </div>
          </div>
        ) : (
          <div>
            <div className="submit-photo-form-field">
              <label>Email</label>
              <input
                id="email"
                name="email"
                placeholder="Enter your Email"
                onChange={onChange}
              />
            </div>
            <div className="submit-photo-form-field">
              <label>Password</label>
              <input
                id="password"
                name="password"
                placeholder="Enter your Password"
                onChange={onChange}
              />
            </div>
            <div className="submit-photo-form-field">
              <label>Repeat password</label>
              <input
                id="password-repeat"
                name="passwordRepeat"
                placeholder="Repeat your password"
                onChange={onChange}
              />
            </div>
            <div className="submit-photo-form-field">
              <label>Describe photo in few words</label>
              <input id="photo-desc" name="imageDesc" onChange={onChange} />
            </div>
          </div>
        ))}
      <div className="upload-photo-input">{children}</div>
      <div className="last-uploaded-image">{lastUploadedImage?.name}</div>
      <div className="complete-photo-upload">
        <button
          onClick={submitContestForm}
          className="btn-apply-photo"
          type="button"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ApplyContestForm;
