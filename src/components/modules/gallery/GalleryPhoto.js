import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";

// import CommonMessage from "components/common/CommonMessage";

import { getPhotoUrlFromPhotoObject, pathToPhoto } from "utils/data.util";

const GalleryPhoto = ({
  author,
  adjustedWidth,
  ...photo
}) => {
  const history = useHistory();
  const photoPath = useMemo(() => pathToPhoto(getPhotoUrlFromPhotoObject(photo)), [photo]);

  const getPhotoPage = () => {
    history.push(`/gallery/all/${photo.photo_submittion_id || photo.photo_id}`);
  };

  return (
    <div
      onClick={getPhotoPage}
      className="gallery-picture"
      key={photo.photo_id}
      style={{ width: adjustedWidth }}
      // onMouseOver={() => toggleCursor(true)}
      // onMouseOut={() => toggleCursor(false)}
    >
      <img src={photoPath} className="gallery-picture__photo site-image" />
    </div>
  );
};

export default GalleryPhoto;
