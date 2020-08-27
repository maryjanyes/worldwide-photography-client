import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiService } from "services/api.service";
import { setRecentSubmittionSuccess } from "reducers/actions/contests.actions";
import { buildDropdownOptions } from "utils/data.util";

import CommonSelectDropdown from "components/common/CommonSelectDropdown";

const ApplyContestForm = ({ children, image }) => {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    userData,
    lastUploadedImage,
    contestCategories,
  } = useSelector(({ users, contests }) => ({
    ...users,
    ...contests,
  }));
  const [contestFormFields, setContestFormFields] = useState({});

  const categoriesOptions = useMemo(() => {
    const categoriesData = buildDropdownOptions(contestCategories);
    return categoriesData;
  }, [contestCategories]);

  const submitContestForm = async () => {
    const fileData = new FormData();
    fileData.append("file", image);
    fileData.append("userName", userData.userName);
    const insertContestPhotoResponse = await apiService.insertBlob(fileData);
    if (insertContestPhotoResponse.code !== 400) {
      const photoData = {
        author_id: userData.userID,
        cetegory_id: contestFormFields.categoryID,
        link_to_file: insertContestPhotoResponse.fileName,
        // camera_details_id: 0,
      };
      const insertPhotoResponse = await apiService.insertData(
        photoData,
        "photos/submitPhoto"
      );
      if (insertPhotoResponse.code !== 400) {
        const contestData = {
          photo_id: insertPhotoResponse.photo_id,
          // todo
          // add fields to it
        };
        const insertContestSubmittionResponse = await apiService.insertData(
          contestData,
          "contests/submittions"
        );
        if (insertContestSubmittionResponse.code !== 400) {
          dispatch(setRecentSubmittionSuccess());
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

  const formDefaultPart = () => {
    return (
      <React.Fragment>
        <div className="submit-photo-form-field">
          <label>Describe photo from your words</label>
          <input
            id="photo-description"
            name="imageDesc"
            onChange={onChange}
            placeholder="Describe photo from your words"
          />
        </div>
        <CommonSelectDropdown
          values={categoriesOptions}
          onSelect={onPhotoCategorySelected}
          dropdownID="selectPhotoCategory"
          label="Select photo category"
        />
      </React.Fragment>
    );
  };

  return (
    <form className="submit-photo-form">
      {isLoggedIn ? (
        formDefaultPart()
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
          {formDefaultPart()}
        </div>
      )}
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
