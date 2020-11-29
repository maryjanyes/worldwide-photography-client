import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

import IconComponent from "components/common/CommonIcon";

import { apiService } from "services/api.service";
import {
  getPhotoUrlFromPhotoObject,
  pathToPhoto,
  getOneFromData,
} from "utils/data.util";

const commonStyle = {
    position: "absolute",
    top: 0,
    zIndex: 0,
  },
  activeStyle = {
    zIndex: 20,
    backgroundColor: "transparent",
    position: "fixed",
    top: "20%",
    left: "10%",
  };

const ContestSubmittion = ({
  contests_submittion_id,
  photo_id,
  author_id,
  updateVisibility,
  activeVisibleSub,
  isVisible,
}) => {
  const { allPhotos, siteUsers } = useSelector(({ photos, users }) => ({
    ...photos,
    ...users,
  }));
  const [author] = useState(getOneFromData(siteUsers, author_id, "author_id"));
  const photoPath = useMemo(() => {
    let path = getOneFromData(allPhotos, photo_id, "photo_submittion_id");
    if (path) {
      path = pathToPhoto(getPhotoUrlFromPhotoObject(path))
    }
    return path;
  }, [allPhotos]);

  const getIconStyle = () => ({
    ...commonStyle,
    ...(isVisible &&
      activeVisibleSub === contests_submittion_id &&
      activeStyle),
  });

  return (
    <div className="contest-submittion" key={photo_id}>
      <img src={photoPath} className="contest-submittion-photo" />
      {/** <IconComponent
        source={`${apiService.CLIENT_ENDPOINT}/assets/icons/baseline_aspect_ratio_black_18dp.png`}
        size={26}
        onClick={() =>
          updateVisibility({
            isVisible: !isVisible,
            sub: {
              author,
              photo,
            },
            subID: contests_submittion_id,
          })
        }
        containerStyle={getIconStyle()}
      /> **/}
    </div>
  );
};

export default ContestSubmittion;
