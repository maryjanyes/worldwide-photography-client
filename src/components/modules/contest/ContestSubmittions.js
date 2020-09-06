import React from "react";

import ContestSubmittion from "./ContestSubmittion";

const ContestSubmittions = ({ submittions }) => {
  const canDisplaySubmittions = submittions.length > 0;
  return (
    <div className="contest-submittions">
      {(canDisplaySubmittions &&
        submittions.map((s) => (
          <ContestSubmittion {...s} key={s.photo_id} />
        ))) || <p>No Submittions for Contest.</p>}
    </div>
  );
};

export default ContestSubmittions;
