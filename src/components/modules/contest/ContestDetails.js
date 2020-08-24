import React from "react";

import { ApiService } from "services/api.service";

const ContestDetails = ({ selectedContest }) => {
  return (
    <div className="contest-details-preview">
      <img
        src={selectedContest.avatar}
        alt={selectedContest.en_name}
        className="contest-details-avatar"
      />
      <div className="contest-info-block">
        <p className="contest-details-preview-name">
          {selectedContest.en_name}
        </p>
        <p className="contest-details-preview-description">
          {selectedContest.description}
        </p>
      </div>
    </div>
  );
};

export default ContestDetails;
