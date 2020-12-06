import React from "react";

import IconDownBlack from '../../../../../assets/images/icon-down-black.png';

const NextSectionJumper = ({ history, selectHash }) => {
    const press = () => {
        history.push(`${history.location.pathname}?${selectHash}=true`);
    };

    return (
        <div className="next-section-jumper" onClick={press}>
            <p>Scroll down</p>
            <img src={IconDownBlack} className="next-section-jumper__image" />
        </div>
    );
}

export default NextSectionJumper;
