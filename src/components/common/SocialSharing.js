import React from "react";
import { useSelector } from "react-redux";

import { getTranslationStr } from "../../utils/data.util";

const SocialSharing = ({ fb, google, shareEntityName = 'share_contest' }) => {
    const { translations, activeLanguage } = useSelector(({ ui }) => ui);

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
            <p>{translations[getTranslationStr(`common.widgets.sharing.${shareEntityName}`, activeLanguage)]}</p>
            <div className="social-sharing__content">
               {sharingBlocks}
            </div>
        </React.Fragment>
    );
}

export default SocialSharing;
