import React, { useState } from "react";

import ContestSubmittion from "./ContestSubmittion";
import ContestPhotoDetailFrame from "components/modules/contest/ContestPhotoDetailFrame";

const ContestSubmittions = ({ submittions }) => {
  const [photoDetailsVisible, setPhotoDetailsVisible] = useState(false);

  const canDisplaySubmittions = submittions.length > 0;

  const handleSubmittionVisibilityChange = ({ sub, isVisible }) => {
    setPhotoDetailsVisible({
      sub,
      isVisible,
    });
  };

  return (
    <React.Fragment>
      {photoDetailsVisible.isVisible && (
        <ContestPhotoDetailFrame
          author={photoDetailsVisible.sub.author}
          photoSrc={photoDetailsVisible.sub.photo}
        />
      )}
      <div className="contest-submittions">
        {(canDisplaySubmittions &&
          submittions.map((s) => (
            <ContestSubmittion
              {...s}
              key={s.photo_id}
              updateVisibility={handleSubmittionVisibilityChange}
            />
          ))) || <p>No Submittions for Contest.</p>}
      </div>
    </React.Fragment>
  );
};

export default ContestSubmittions;
