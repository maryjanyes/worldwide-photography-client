import React from "react";

import ContestSubmittion from "./ContestSubmittion";

const ContestSubmittions = ({ submittions, refreshSubmittions }) => {
  return (
    <React.Fragment>
      <div className="contest-submittions">
        {(submittions.length > 0 &&
          submittions.map(s => (
            <ContestSubmittion
              {...s}
              key={s.photo_id}
              refreshSubmittions={refreshSubmittions}
            />
          ))) || <p className="contest-submittions__no-items">No Submittions for contest.</p>}
      </div>
    </React.Fragment>
  );
};

export default ContestSubmittions;
