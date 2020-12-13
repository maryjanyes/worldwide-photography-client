import React, { useState } from "react";

import ContestSubmittionInfo from "components/modules/contest/ContestSubmittionInfo";
import CommonMessage from "components/common/CommonMessage";

import photosService from "services/photos.service";
import { getPhotoUrlFromPhotoObject, pathToPhoto } from "utils/data.util";

const GalleryPhoto = ({
  author,
  adjustedWidth,
  ...photo
}) => {
  const [cursorActive, setCursorActive] = useState(false);
  const [showLikeMessage, setShowLikeMessage] = useState(false);
  const toggleCursor = state => {
    setCursorActive(state);
  };

  const photoPath = pathToPhoto(getPhotoUrlFromPhotoObject(photo));

  const likePhoto = async () => {
    try {
      const voteResponse = await(await photosService.voteImageOrSubmittion(null, photo_id));
      if (voteResponse.isSuccess) {
        setShowLikeMessage(true);
      }
    } catch(err) {

    }
  };

  return (
    <div
      onClick={likePhoto}
      className="gallery-picture"
      key={photo.photo_id}
      style={{ width: adjustedWidth }}
      onMouseOver={() => toggleCursor(true)}
      onMouseOut={() => toggleCursor(false)}
    >
      <img src={photoPath} className="gallery-picture__photo" />
      <div className="gallery-picture__details">
        {/** cursorActive && <ContestSubmittionInfo author={author} votes={photo.votes} /> **/}
      </div>
      {showLikeMessage && <CommonMessage text="Submittion success" theme="success-message" />}
    </div>
  );
};

export default GalleryPhoto;
