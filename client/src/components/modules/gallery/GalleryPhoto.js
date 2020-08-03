import React, { useState } from 'react';

import IconComponent from 'components/common/IconComponent';

const GalleryPhoto = ({ link_to_file, impressions_count = 0, name, adjustedWidth, author }) => {
    const [cursorActive, setCursorActive] = useState(false);
    const toggleActive = state => {
        setCursorActive(state);
    };
    return (
        <div className="gallery-picture" style={{ width: adjustedWidth }} onMouseOver={() => toggleActive(true)} onMouseOut={() => toggleActive(false)}>
            <img src={link_to_file} alt={name} className="gallery-picture-photo" />
            <div className="gallery-picture-details">
                <span>{author}</span>
                {cursorActive && <div className="gallery-photo-impressions">
                    <span className="impressions-count">{impressions_count}</span>
                    <IconComponent size={22} source="assets/images/favorite-icon.png" />
                </div>}
            </div>
        </div>
    );
};

export default GalleryPhoto;
