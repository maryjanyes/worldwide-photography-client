import React, { useState } from "react";

import IconComponent from "components/common/IconComponent";

import { apiService } from "services/api.service";

const GalleryPhoto = ({
  link_to_file,
  impressions_count,
  author,
  adjustedWidth,
}) => {
  const [cursorActive, setCursorActive] = useState(false);
  const toggleActive = (state) => {
    setCursorActive(state);
  };
  return (
    <div
      className="gallery-picture"
      style={{ width: adjustedWidth }}
      onMouseOver={() => toggleActive(true)}
      onMouseOut={() => toggleActive(false)}
    >
      <img
        src={`${apiService.BACKEND_ENDPOINT}/photos/${link_to_file}`}
        className="gallery-picture-photo"
      />
      <div className="gallery-picture-details">
        <span>{author}</span>
        {cursorActive && (
          <div className="gallery-photo-impressions">
            <span className="impressions-count">{impressions_count}</span>
            <IconComponent
              size={22}
              source="http://localhost:3000/assets/icons/favorite-icon.png"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPhoto;
