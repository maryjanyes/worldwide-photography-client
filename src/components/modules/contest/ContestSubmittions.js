import React, { useState } from "react";

import ContestSubmittion from "./ContestSubmittion";

const ContestSubmittions = ({ submittions, refresh }) => {
  const [photoDetailsVisible, setPhotoDetailsVisible] = useState(false);
  const [activeDetailsVisible, setActiveDetailsVisible] = useState(0);

  return (
    <React.Fragment>
      <div className="contest-submittions">
        {(submittions.length > 0 &&
          submittions.map(s => (
            <ContestSubmittion
              {...s}
              key={s.photo_id}
              refresh={refresh}
              // updateVisibility={handleSubmittionVisibilityChange}
              // isVisible={photoDetailsVisible.isVisible}
              // activeVisibleSub={activeDetailsVisible}
            />
          ))) || <p className="contest-submittions__no-items">No Submittions for contest.</p>}
      </div>
    </React.Fragment>
  );
};

export default ContestSubmittions;
