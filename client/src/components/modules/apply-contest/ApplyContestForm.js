import React from 'react';

const SubmitPhotoForm = ({ afterSubmit, children }) => {
    return (
        <form className="submit-photo-form">
            <div className="submit-photo-form-field">
                <input />
            </div>
            <div className="submit-photo-form-field">
                <input />
            </div>
            {/** <div className="submit-photo-form-field">
                {children}
            </div> **/}
            <div className="submit-photo-form-field">
                <button onClick={afterSubmit} className="submit-photo-btn">Submit</button>
            </div>
        </form>
    );
};

export default SubmitPhotoForm;