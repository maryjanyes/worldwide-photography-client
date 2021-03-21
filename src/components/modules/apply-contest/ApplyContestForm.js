import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import ContestsService from "services/contests.service";
import PhotosService from "services/photos.service";
import { apiService } from "services/api.service";
import { setRecentSubmittionSuccess, setContestsSubmittionsSuccess } from "reducers/actions/contests.actions";
import { setPhotosSubmittionsSuccess } from "reducers/actions/photos.actions";
import { buildDropdownOptions, getTranslationStr, isDataValid } from "utils/data.util";
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
    contestCategories,
    recentSubmittionSuccess,
    activeLanguage,
    translations,
    errorOnAuth
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
      setSubmittionIsSuccess(true);
    }
  }, [isLoggedIn, recentSubmittionSuccess]);

  const categoriesOptions = useMemo(() => {
    const categoriesData = buildDropdownOptions(contestCategories, activeLanguage, translations);
    return categoriesData;
  }, [contestCategories]);

  const refreshSubmittionsData = async () => {
    const submittionsData = await ContestsService.getSubmittionsForContest(parseInt(contestID, 10));
    if (isDataValid(submittionsData)) {
      dispatch(setContestsSubmittionsSuccess(submittionsData.data));
    }
    const photosSubmittionsData = await PhotosService.getPhotosSubmittions();
    if (isDataValid(photosSubmittionsData)) {
      dispatch(setPhotosSubmittionsSuccess(photosSubmittionsData.data));
    }
  };

  const submitContestForm = async () => {
    if (image) {
      const fileData = new FormData();
      fileData.append("file", image);
      const submittionImageResponse = await apiService.insertContestImage(
        fileData,
        contestName
      );
      if (submittionImageResponse.isSuccess) {
        const photoData = {
          author_id: userData.user_id,
          category_id: contestFormFields.categoryID,
          description: contestFormFields.imageDesc,
          link_to_file: `ContestSubmittionImage/${contestName}/${submittionImageResponse.fileName}`,
          link_to_facebook: contestFormFields.linkToFacebook,
          link_to_instagram: contestFormFields.linkToInstagram,
          camera_details_id: 0,
        };
        const photoResponse = await(await apiService.insertData(
          photoData,
          "photos/submittions"
        )).json();
        const submittionID = photoResponse.generatedMaps[0]?.photo_submittion_details_id;
        const contestData = {
          contest_id: contestID,
          photo_id: submittionID,
        };
        const contestSubmittionResponse = await(await apiService.insertData(
          contestData,
          "contests/submittions"
        )).json();
        if (contestSubmittionResponse.isSuccess) {
          dispatch(setRecentSubmittionSuccess());
          setIsSubmittionPending(true);
          close();
          setTimeout(() => refreshSubmittionsData(), 1000);
        }
      }
    }
  };

  const onChange = change => {
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
            autoComplete="linkToFacebook"
          />
        </div>
        <div className="form-field apply-contest-form-field">
          <label>Link to Instagram</label>
          <input
            className="common-input"
            name="linkToInstagram"
            placeholder="Link to Instagram"
            onChange={onChange}
            autoComplete="linkToInstagram"
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
          <label>{getTranslationStr("common.forms.apply_contest.followers_message", activeLanguage)}</label>
          <input
            className="common-input"
            placeholder={getTranslationStr("common.forms.apply_contest.followers_message", activeLanguage)}
            onChange={onChange}
            name="signature_for_followers"
          />
        </div>
        <div className="upload-input-container">{children}</div>
        <div className="upload-input-container__next">
          <button
            onClick={submitContestForm}
            className="btn-apply-photo"
            type="button"
            disabled={!isLoggedIn || !isFormValid()}
          >
            {getTranslationStr("common.button_actions.submit", activeLanguage)}
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
          {errorOnAuth && <CommonMessage text={errorOnAuth} theme="error-message" />}
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
