import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

import CommonMessage from "components/common/CommonMessage";

import { getPhotoUrlFromPhotoObject, pathToPhoto } from "utils/data.util";

const GalleryPhoto = ({
  author,
  adjustedWidth,
  ...photo
}) => {
  const [cursorActive, setCursorActive] = useState(false);
  const history = useHistory();
  const photoPath = useMemo(() => pathToPhoto(getPhotoUrlFromPhotoObject(photo)), [photo]);

  const toggleCursor = state => {
    setCursorActive(state);
  };

  const getPhotoPage = () => {
    history.push(`/gallery/all/${photo.photo_submittion_id || photo.photo_id}`);
  };

  return (
    <div
      onClick={getPhotoPage}
      className="gallery-picture"
      key={photo.photo_id}
      style={{ width: adjustedWidth }}
      onMouseOver={() => toggleCursor(true)}
      onMouseOut={() => toggleCursor(false)}
    >
      <img src={photoPath} className="gallery-picture__photo" />
      {/** showLikeMessage && <CommonMessage text="Submittion success" theme="success-message" /> **/}
    </div>
  );
};

export default GalleryPhoto;
