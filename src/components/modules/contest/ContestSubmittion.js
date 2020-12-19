import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import IconComponent from "components/common/CommonIcon";
import ContestSubmittionInfo from "components/modules/contest/ContestSubmittionInfo";
import CommonMessage from "components/common/CommonMessage";

import photosService from "services/photos.service";
import { apiService } from "services/api.service";
import { getPhotoUrlFromPhotoObject, pathToPhoto, getOneFromData } from "utils/data.util";

const ContestSubmittion = ({
  contests_submittion_id,
  photo_id,
  author_id,
  votes,
  refresh,
}) => {
  const { allPhotos, siteUsers } = useSelector(({ photos, users }) => ({
    ...photos,
    ...users,
  }));
  const history = useHistory();
  const [showLikeMessage, setShowLikeMessage] = useState(false);

  const author = useMemo(() => {
    return getOneFromData(siteUsers, author_id+1, "user_id")
  }, [siteUsers]);
  const photoPath = useMemo(() => {
    let path = getOneFromData(allPhotos, photo_id, "photo_submittion_id");
    return path && pathToPhoto(getPhotoUrlFromPhotoObject(path)) || path;
  }, [allPhotos]);

  const navigatePhotoPage = () => {
    history.push(`/gallery/all/${contests_submittion_id}`);
  };

  const likePhoto = async () => {
    try {
      const voteResponse = await(await photosService.voteImageOrSubmittion(contests_submittion_id, photo_id)).json();
      if (voteResponse.isSuccess) {
        // todo
        // setShowLikeMessage(true);
        refresh();
      }
    } catch(err) { }
  };

  return (
    <div className="contest-submittion" key={photo_id}>
      <div className="contest-submittion__photo">
        <img src={photoPath} className="contest-submittion__photo-image" />
        <div className="contest-submittion__photo-actions">
          <IconComponent
            source={`${apiService.CLIENT_ENDPOINT}/assets/icons/baseline_aspect_ratio_black_18dp.png`}
            size={26}
            description="Open full screen!"
            alt="Open submittion on full screen WorldwidePhotography"
            superClass="icon-full-screen"
            onClick={navigatePhotoPage}
          />
          <IconComponent
            source={`${apiService.CLIENT_ENDPOINT}/assets/icons/favorite-icon.png`}
            size={26}
            onClick={likePhoto}
            description="Vote submittion!"
            alt="Open submittion on full screen WorldwidePhotography"
            superClass="icon-vote"
          />
        </div>
      </div>
      <ContestSubmittionInfo author={author} votes={votes} />
      {showLikeMessage && <CommonMessage text="Submittion success" theme="success-message" />}
    </div>
  );
};

export default ContestSubmittion;
