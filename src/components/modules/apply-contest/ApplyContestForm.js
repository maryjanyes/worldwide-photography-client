import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ContestsService from 'services/contests.service';

const ApplyContestForm = ({ children, isPhotoUploaded, image }) => {
    const { isLoggedIn, userData } = useSelector(({ users }) => users);
    const [contestFormFields, setContestFormFields] = useState({});
    const submitContestForm = () => {
        ContestsService.submitContestImage(userData, image, contestFormFields.imageDesc);
    };
    const onChange = change => {
        setContestFormFields({
            ...contestFormFields,
            [change.target.name]: change.target.value,
        });
    };

    return (
        <form className="submit-photo-form">
            {isPhotoUploaded && (
                isLoggedIn ?
                    <div>
                        <div className="submit-photo-form-field">
                            <label>Describe photo in few words</label>
                            <input id="photo-desc" name="imageDesc" onChange={onChange} />
                        </div>
                    </div> :
                    <div>
                        <div className="submit-photo-form-field">
                            <label>Email</label> 
                            <input id="email" name="email" placeholder="Enter your Email" onChange={onChange} />
                        </div>
                        <div className="submit-photo-form-field">
                            <label>Password</label>
                            <input id="password" name="password" placeholder="Enter your Password" onChange={onChange} />
                        </div>
                        <div className="submit-photo-form-field">
                            <label>Repeat password</label>
                            <input id="password-repeat" name="passwordRepeat" placeholder="Repeat your password" onChange={onChange} />
                        </div>
                        <div className="submit-photo-form-field">
                            <label>Describe photo in few words</label>
                            <input id="photo-desc" name="imageDesc" onChange={onChange} />
                        </div>
                    </div>
            )}
            <div className="upload-photo-input">
                {children}
            </div>
            <div className="complete-photo-upload">
                <button onClick={submitContestForm} className="btn-apply-photo">Submit</button>
            </div>
        </form>
    );
};

export default ApplyContestForm;