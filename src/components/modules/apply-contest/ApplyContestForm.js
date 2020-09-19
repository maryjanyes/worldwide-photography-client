import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiService } from "services/api.service";
import { setRecentSubmittionSuccess } from "reducers/actions/contests.actions";
import { buildDropdownOptions } from "utils/data.util";
import { signUp } from "reducers/actions/auth.actions";

import CommonSelectDropdown from "components/common/CommonSelectDropdown";
import Message from "components/common/Message";

const ApplyContestForm = ({ children, image, contestID, close }) => {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    userData,
    lastUploadedImage,
    contestCategories,
    recentSubmittionSuccess,
  } = useSelector(({ auth, contests }) => ({
    ...auth,
    ...contests,
  }));
  const [contestFormFields, setContestFormFields] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLogIsSuccess, setIsLogInSuccess] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLogInSuccess(true);
    }
    if (recentSubmittionSuccess) {
      setIsSuccess(true);
    }
  }, [isLoggedIn, recentSubmittionSuccess]);

  const categoriesOptions = useMemo(() => {
    const categoriesData = buildDropdownOptions(contestCategories);
    return categoriesData;
  }, [contestCategories]);

  const submitContestForm = async () => {
    const fileData = new FormData();
    fileData.append("file", image);
    const insertContestPhotoResponse = await apiService.insertBlob(fileData);
    if (insertContestPhotoResponse.success) {
      const photoData = {
        author_id: userData.user_id,
        cetegory_id: contestFormFields.categoryID,
        description: contestFormFields.imageDesc,
        link_to_file: insertContestPhotoResponse.fileName,
        camera_details_id: 0,
      };
      const photoResponse = await apiService.insertData(
        photoData,
        "photos/submitPhoto"
      );
      const photoResponseBody = await photoResponse.json();
      if (photoResponseBody.code !== 400) {
        const contestData = {
          contest_id: contestID,
          photo_id: photoResponseBody.response.generatedMaps[0].photo_id,
        };
        const contestSubmittionResponse = await apiService.insertData(
          contestData,
          "contests/submittions"
        );
        const contestSubmittionsResponseBody = await contestSubmittionResponse.json();
        if (contestSubmittionsResponseBody.code !== 400) {
          dispatch(setRecentSubmittionSuccess());
          setIsSuccess(true);
          setTimeout(() => close(), 5000);
        }
      }
    }
  };

  const onChange = (change) => {
    setContestFormFields({
      ...contestFormFields,
      [change.target.name]: change.target.value,
    });
  };

  const onPhotoCategorySelected = (optionID) => {
    const category = contestCategories.find((c, cIndex) => cIndex === optionID);
    setContestFormFields({
      ...contestFormFields,
      categoryID: category.contest_category_id,
    });
  };

  const trySignUp = () => {
    const { email, password, passwordRepeat } = contestFormFields;
    if (password && passwordRepeat && email) {
      dispatch(signUp({ email, password }, dispatch));
    }
  };

  const formDefaultPart = () => {
    return (
      <div className="photo-details">
        <div className="submit-photo-form-field">
          <label>Describe photo from your words</label>
          <input
            id="photo-description"
            name="imageDesc"
            onChange={onChange}
            placeholder="Describe photo from your words"
          />
        </div>
        <div className="submit-photo-form-field">
          <input
            name="linkToFacebook"
            placeholder="Link to Facebook"
            onChange={onChange}
          />
        </div>
        <div className="submit-photo-form-field">
          <input
            name="linkToInstagram"
            placeholder="Link to Instagram"
            onChange={onChange}
          />
        </div>
        <CommonSelectDropdown
          values={categoriesOptions}
          onSelect={onPhotoCategorySelected}
          dropdownID="selectPhotoCategory"
          label="Photo category"
        />
      </div>
    );
  };

  const needAuthPart = () => {
    return (
      <div className="sign-up-details">
        <span className="no-logged-in-message">
          You must be logged in before start to submit photos.
        </span>
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
            type="password"
          />
        </div>
        <div className="submit-photo-form-field">
          <label>Repeat password</label>
          <input
            id="password-repeat"
            name="passwordRepeat"
            placeholder="Repeat your password"
            onChange={onChange}
            type="password"
          />
        </div>
        {isSuccess && <p className="">Photo submitted.</p>}
        <div className="complete-sign-up">
          <button onClick={trySignUp} className="btn-apply-photo" type="button">
            Sign Up
          </button>
        </div>
      </div>
    );
  };

  const isFormValid = () => {
    return contestFormFields.imageDesc && contestFormFields.categoryID;
  };

  return (
    <form className="submit-photo-form">
      {isLogIsSuccess && <Message text="You are logged in." />}
      {isSuccess && <Message text="New submittion sended." />}
      {isLoggedIn ? (
        formDefaultPart()
      ) : (
        <React.Fragment>
          {needAuthPart()}
          {formDefaultPart()}
        </React.Fragment>
      )}
      <div className="upload-photo-input">{children}</div>
      <span className="last-uploaded-image">{lastUploadedImage?.name}</span>
      <div className="complete-photo-upload">
        <button
          onClick={submitContestForm}
          className="btn-apply-photo"
          type="button"
          disabled={!isLoggedIn && !isFormValid()}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ApplyContestForm;
