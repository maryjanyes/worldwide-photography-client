import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import IconComponent from "components/common/CommonIcon";

import { apiService } from "services/api.service";
import {
  getPhotoUrlFromPhotoObject,
  pathToPhoto,
  getOneFromData,
} from "utils/data.util";

/**
 *   const commonStyle = {
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

  const getIconStyle = () => ({
    ...commonStyle,
    ...(isVisible &&
      activeVisibleSub === contests_submittion_id &&
      activeStyle),
  });
 */

const ContestSubmittion = ({
  contests_submittion_id,
  photo_id,
  author_id,
  votes,
  updateVisibility,
  isVisible,
  // activeVisibleSub,
}) => {
  const { allPhotos, siteUsers } = useSelector(({ photos, users }) => ({
    ...photos,
    ...users,
  }));

  const author = useMemo(() => {
    return getOneFromData(siteUsers, author_id+1, "user_id")
  }, [siteUsers]);
  const photoPath = useMemo(() => {
    let path = getOneFromData(allPhotos, photo_id, "photo_submittion_id");
    if (path) {
      path = pathToPhoto(getPhotoUrlFromPhotoObject(path))
    }
    return path;
  }, [allPhotos]);

  const toggleVisibility = (_) => updateVisibility({
    isVisible: !isVisible,
    sub: {
      author,
      photo,
    },
    subID: contests_submittion_id,
  });

  const likePhoto = async () => {
    const thumbResult = await apiService.thumbUpPhoto(photo_id);
    console.log(thumbResult)
  };

  return (
    <div className="contest-submittion" key={photo_id}>
      <img src={photoPath} className="contest-submittion__photo" />
      {author && <p className="contest-submittion__author-name">
        Photo author {author?.first_name || author?.email}
      </p>}
      <p>Votes count {votes}</p>
      <div className="contest-submittion__actions">
        <IconComponent
          source={`${apiService.CLIENT_ENDPOINT}/assets/icons/baseline_aspect_ratio_black_18dp.png`}
          size={26}
        />
        <IconComponent
          source={`${apiService.CLIENT_ENDPOINT}/assets/icons/favorite-icon.png`}
          size={26}
          onClick={() => likePhoto}
        />
      </div>
    </div>
  );
};

export default ContestSubmittion;
