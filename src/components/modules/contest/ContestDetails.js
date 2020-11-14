import React from "react";

import WithLanguageProps from "components/common/wrappers/WithLanguageProps";

import { pathToPhoto } from "utils/data.util";

const ContestDetails = ({ photo_path, name, description }) => {
  return (
    <div className="contest-details">
      <img src={pathToPhoto(photo_path)} />
      <div className="contest-details-preview">
        <p className="contest-details-preview-name">{name}</p>
        <p className="contest-details-preview-description">{description}</p>
      </div>
    </div>
  );
};

export default WithLanguageProps(ContestDetails);
