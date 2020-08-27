import React, { useState } from "react";
import { useSelector } from "react-redux";

import IconComponent from "components/common/IconComponent";

import { getPhotoUrlFromPhotoObject, pathToPhoto } from "utils/data.util";

const ContestPhoto = ({ photo_id }) => {
  const { allPhotos } = useSelector(({ photos }) => photos);
  const [contestPhoto] = useState(
    allPhotos && allPhotos.find((p) => p.photo_id === photo_id)
  );
  return (
    <div className="contest-photo" key={photo_id}>
      <img src={pathToPhoto(getPhotoUrlFromPhotoObject(contestPhoto))} alt="" />
      <IconComponent source={""} size={40} />
    </div>
  );
};

export default ContestPhoto;
