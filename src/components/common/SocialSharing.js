import React from "react";

const SocialSharing = ({ fb, google, /** etc */ }) => {
    let sharingBlocks = [];

    if (fb) {
        sharingBlocks.push(
            <div className="social-sharing__block sharing__fb" key="facebook">
                <i className="fab fa-facebook-f"></i>
            </div>
        );
    }

    if (google) {
        sharingBlocks.push(
            <div className="social-sharing__block sharing__google" key="google">
               <i className="fab fa-google"></i>
            </div>
        );
    }

    return (
        <React.Fragment>
            <p>Share content</p>
            <div className="social-sharing__content">
               {sharingBlocks}
            </div>
        </React.Fragment>
    );
}

export default SocialSharing;
