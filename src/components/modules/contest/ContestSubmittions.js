import React, { useState } from "react";

import ContestSubmittion from "./ContestSubmittion";
import ContestPhotoDetailsFrame from "components/modules/contest/ContestPhotoDetailsFrame";

const ContestSubmittions = ({ submittions }) => {
  const [photoDetailsVisible, setPhotoDetailsVisible] = useState(false);
  const [activeDetailsVisible, setActiveDetailsVisible] = useState(0);

  const canDisplaySubmittions = submittions.length > 0;

  const handleSubmittionVisibilityChange = ({ sub, isVisible, subID }) => {
    setPhotoDetailsVisible({
      sub,
      isVisible,
    });
    setActiveDetailsVisible(subID);
  };

  return (
    <React.Fragment>
      {photoDetailsVisible.isVisible && (
        <ContestPhotoDetailsFrame
          author={photoDetailsVisible.sub.author}
          photo={photoDetailsVisible.sub.photo}
        />
      )}
      <div className="contest-submittions">
        {(canDisplaySubmittions &&
          submittions.map(s => (
            <ContestSubmittion
              {...s}
              key={s.photo_id}
              updateVisibility={handleSubmittionVisibilityChange}
              isVisible={photoDetailsVisible.isVisible}
              activeVisibleSub={activeDetailsVisible}
            />
          ))) || <p>No Submittions for contest.</p>}
      </div>
    </React.Fragment>
  );
};

export default ContestSubmittions;
