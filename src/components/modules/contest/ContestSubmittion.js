import React, { useState } from "react";
import { useSelector } from "react-redux";

import IconComponent from "components/common/IconComponent";

import { apiService } from "services/api.service";
import { getPhotoUrlFromPhotoObject, pathToPhoto } from "utils/data.util";

const ContestSubmittion = ({ photo_id }) => {
  const { allPhotos } = useSelector(({ photos }) => photos);
  const [contestPhoto] = useState(
    allPhotos && allPhotos.find((p) => p.photo_id === photo_id)
  );

  return (
    <div className="contest-submittion" key={photo_id}>
      <img
        src={pathToPhoto(getPhotoUrlFromPhotoObject(contestPhoto))}
        className="contest-submittion-photo"
      />
      <div className="contest-submittion-resize">
        <IconComponent
          source={`${apiService.CLIENT_ENDPOINT}/assets/images/baseline_aspect_ratio_black_18dp.png`}
          size={26}
        />
      </div>
    </div>
  );
};

export default ContestSubmittion;
