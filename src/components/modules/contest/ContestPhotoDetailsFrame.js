import React, { useMemo } from "react";

import { pathToPhoto } from "../../../utils/data.util";

const ContestPhotoDetailsFrame = ({ photo, author }) => {
  const photoSrc = useMemo(() => {
    return pathToPhoto(photo.link_to_file);
  }, [photo]);

  return (
    <div className="photo-details-frame">
      <img src={photoSrc} className="photo-detail-popup-image" />
      {/** <div className="author-info">
        <p>Name {author || {}.name}</p>
        <p>Location {author || {}.location}</p>
        </div> **/}
    </div>
  );
};

export default ContestPhotoDetailsFrame;
