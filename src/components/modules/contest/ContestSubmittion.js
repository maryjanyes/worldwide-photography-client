import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import IconComponent from "components/common/CommonIcon";

import { votePhoto } from "utils/action.utils";
import { getPhotoUrlFromPhotoObject, pathToPhoto, getOneFromData } from "utils/data.util";

const ContestSubmittion = ({
  contests_submittion_id,
  photo_id,
  votes,
  refreshSubmittions,
  // author_id,
}) => {
  const { photoSubmittions } = useSelector(({ photos, users }) => ({
    ...photos,
    ...users,
  }));
  const history = useHistory();

  const photoPath = useMemo(() => {
    let path = getOneFromData(photoSubmittions, photo_id, "photo_submittion_id");
    return path && pathToPhoto(getPhotoUrlFromPhotoObject(path));
  }, [photoSubmittions]);

  const navigatePhotoPage = () => {
    history.push(`/gallery/all/${contests_submittion_id}`);
  };

  return (
    <div className="contest-submittion" key={photo_id}>
      <div className="contest-submittion__photo">
        {photoPath && <img src={photoPath} className="contest-submittion__photo-image site-image" />}
        <div className="contest-submittion__photo-actions">
          <IconComponent
            source="fa-compress"
            description="Open full screen"
            containerStyle={{ margin: '10px 0' }}
            onClick={navigatePhotoPage}
          />
          <IconComponent
            source="fa-thumbs-up"
            onClick={() => votePhoto(photo_id, refreshSubmittions)}
            description="Vote submittion"
            containerStyle={{ margin: '10px 0' }}
          />
          <span className="contest-submittion__votes">{votes}</span>
        </div>
      </div>
    </div>
  );
};

export default ContestSubmittion;
