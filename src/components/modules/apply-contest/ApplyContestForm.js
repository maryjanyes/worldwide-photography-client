import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { apiService } from "services/api.service";
import { setRecentSubmittionSuccess } from "reducers/actions/contests.actions";
import { buildDropdownOptions, getTranslationStr } from "utils/data.util";
import { signIn } from "reducers/actions/auth.actions";

import CommonSelectDropdown from "components/common/CommonSelectDropdown";
import CommonMessage from "components/common/CommonMessage";

const ApplyContestForm = ({
  children,
  image,
  contestID,
  contestName,
  close,
}) => {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    userData,
    lastUploadedImage,
    contestCategories,
    recentSubmittionSuccess,
    activeLanguage,
    translations
  } = useSelector(({ auth, contests, ui }) => ({
    ...auth,
    ...contests,
    ...ui
  }));
  const [contestFormFields, setContestFormFields] = useState({});
  const [isSubmittionSuccess, setSubmittionIsSuccess] = useState(false);
  const [isSubmittionPending, setIsSubmittionPending] = useState(false)
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
    const categoriesData = buildDropdownOptions(contestCategories, activeLanguage, translations);
    return categoriesData;
  }, [contestCategories]);

  const submitContestForm = async () => {
    const fileData = new FormData();
    fileData.append("file", image);
    const insertContestPhotoResponse = await apiService.insertBlob(
      fileData,
      contestName
    );
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
        if (contestSubmittionsResponseBody.isSuccess) {
          dispatch(setRecentSubmittionSuccess());
          setIsSubmittionPending(true);
          close();
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

  const trySignIn = () => {
    const { email, password } = contestFormFields;
    if (password && email) {
      dispatch(signIn({ email, password }, dispatch));
    }
  };

  const isFormValid = () => {
    return contestFormFields.imageDesc && contestFormFields.categoryID;
  };

  const submittionPart = () => {
    return (
      <div className="apply-contest-submittion-data">
        <div className="form-field apply-contest-form-field">
          <label>Describe photo from your words</label>
          <input
            className="common-input"
            id="photo-description"
            name="imageDesc"
            onChange={onChange}
            placeholder="Describe photo from your words"
          />
        </div>
        <div className="form-field apply-contest-form-field">
          <label>Link to Facebook</label>
          <input
            className="common-input"
            name="linkToFacebook"
            placeholder="Link to Facebook"
            onChange={onChange}
          />
        </div>
        <div className="form-field apply-contest-form-field">
          <label>Link to Instagram</label>
          <input
            className="common-input"
            name="linkToInstagram"
            placeholder="Link to Instagram"
            onChange={onChange}
          />
        </div>
        <div className="form-field apply-contest-form-field">
          <CommonSelectDropdown
            values={categoriesOptions}
            onSelect={onPhotoCategorySelected}
            dropdownID="selectPhotoCategory"
            label="Select photo category"
          />
        </div>
        <div className="form-field apply-contest-form-field">
          <label>Message for peoples who like your photo</label>
          <input
            className="common-input"
            placeholder="Message for followers"
            onChange={onChange}
            name="singature_for_followers"
          />
        </div>
        <div className="upload-input-container">{children}</div>
        <span className="uploaded-image-name">{lastUploadedImage?.name}</span>
        <div className="submit-photo-container">
          <button
            onClick={submitContestForm}
            className="btn-apply-photo"
            type="button"
            disabled={!isLoggedIn && !isFormValid()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const needAuthPart = () => {
    return (
      <div className="sign-up-details">
        <CommonMessage
          text="You must be logged in before start to submit photos."
          theme="warning-message"
        />
        <div className="form-field apply-contest-form-field">
          <label>{translations[getTranslationStr("forms.common.email", activeLanguage)]}</label>
          <input
            id="email"
            name="email"
            className="common-input"
            placeholder={translations[getTranslationStr("forms.common.email", activeLanguage)]}
            onChange={onChange}
          />
        </div>
        <div className="form-field apply-contest-form-field">
          <label>{translations[getTranslationStr("forms.common.password", activeLanguage)]}</label>
          <input
            id="password"
            name="password"
            className="common-input"
            placeholder={translations[getTranslationStr("forms.common.password", activeLanguage)]}
            onChange={onChange}
            type="password"
          />
        </div>
        <p className="apply-contest-get-sign-up">
          {translations[getTranslationStr("common.forms.sign_in.get_sign_up", activeLanguage)]}
          <Link to="/sign-up">
            {translations[getTranslationStr("common.button_actions.sign_up", activeLanguage)]}
          </Link>
      </p>
        <div className="apply-contest-sign-in-container">
          <button onClick={trySignIn} className="btn-apply-photo" type="button">
            {translations[getTranslationStr("common.button_actions.sign_in", activeLanguage)]}
          </button>
        </div>
      </div>
    );
  };

  return (
    <form className="submit-photo-form">
      {isLogIsSuccess && <CommonMessage text="You are logged in." theme="success-message" />}
      {isSubmittionPending && <CommonMessage text="You are redirecting to pay for submittion.. Waiting." theme="seccess-message" />}
      {isSubmittionSuccess && <CommonMessage text="New submittion sended." theme="seccess-message" />}
      {isLoggedIn ? submittionPart() : needAuthPart()}
    </form>
  );
};

export default ApplyContestForm;
