import React, { useState } from "react";
import { useSelector } from "react-redux";

import IconComponent from "components/common/IconComponent";

import { apiService } from "services/api.service";
import {
  getPhotoUrlFromPhotoObject,
  pathToPhoto,
  getOneFromData,
} from "utils/data.util";

const ContestSubmittion = ({ photo_id, author_id, updateVisibility }) => {
  const { allPhotos, siteUsers } = useSelector(({ photos, users }) => ({
    ...photos,
    ...users,
  }));
  const [photo] = useState(getOneFromData(allPhotos, photo_id, "photo_id"));
  const [author] = useState(
    getOneFromData(siteUsers, author_id, "author_id") || { name: "Murply" }
  );
  const photoPath = pathToPhoto(getPhotoUrlFromPhotoObject(photo));

  return (
    <div className="contest-submittion" key={photo_id}>
      <img src={photoPath} className="contest-submittion-photo" />
      <IconComponent
        source={`${apiService.CLIENT_ENDPOINT}/assets/icons/baseline_aspect_ratio_black_18dp.png`}
        size={26}
        onMouseMove={() =>
          updateVisibility({
            isVisible: true,
            sub: {
              author,
              photo,
            },
          })
        }
        onMouseOut={() =>
          updateVisibility({
            isVisible: false,
            sub: {
              author,
              photo,
            },
          })
        }
        containerStyle={{
          position: "absolute",
          top: 0,
        }}
      />
    </div>
  );
};

export default ContestSubmittion;
