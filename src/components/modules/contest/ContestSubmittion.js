import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import IconComponent from "components/common/CommonIcon";

import PhotosService from "services/photos.service";
import { apiService } from "services/api.service";
import { getPhotoUrlFromPhotoObject, pathToPhoto, getOneFromData } from "utils/data.util";

const ContestSubmittion = ({
  contests_submittion_id,
  photo_id,
  author_id,
  votes,
  refreshSubmittions,
}) => {
  const { photoSubmittions, siteUsers } = useSelector(({ photos, users }) => ({
    ...photos,
    ...users,
  }));
  const history = useHistory();

  const author = useMemo(() => {
    return getOneFromData(siteUsers, author_id+1, "user_id")
  }, [siteUsers]);
  const photoPath = useMemo(() => {
    let path = getOneFromData(photoSubmittions, photo_id, "photo_submittion_id");
    return path && pathToPhoto(getPhotoUrlFromPhotoObject(path));
  }, [photoSubmittions]);

  const navigatePhotoPage = () => {
    history.push(`/gallery/all/${contests_submittion_id}`);
  };

  const likePhoto = async () => {
    try {
      const voteResponse = await PhotosService.voteImageOrSubmittion(contests_submittion_id);
      if (voteResponse.isSuccess) {
        refreshSubmittions();
      }
    } catch(err) { }
  };

  return (
    <div className="contest-submittion" key={photo_id}>
      <div className="contest-submittion__photo">
        {photoPath && <img src={photoPath} className="contest-submittion__photo-image site-image" />}
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
          <span className="contest-submittion__votes">{votes}</span>
        </div>
      </div>
    </div>
  );
};

export default ContestSubmittion;
