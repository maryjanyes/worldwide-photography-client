import React, { useState } from 'react';

import IconComponent from 'components/common/IconComponent';

const ContestPhoto = ({ link_to_file }) => {
    return (
        <div className="contest-photo">
            <img src={link_to_file} />
        </div>
    );
};

export default ContestPhoto;
