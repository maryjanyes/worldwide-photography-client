import React from "react";

import WithLanguageProps from "components/wrappers/WithLanguageProps";

import { pathToPhoto } from "utils/data.util";

const ContestDetails = ({ photo_path, name, description }) => {
  return (
    <div className="all-contests__contest-details">
      <img className="all-contests__contest-details__info__image" src={pathToPhoto(photo_path)} />
      {/** <div className="all-contests__contest-details__info">
        <p className="all-contests__contest-details__info__name">{name}</p>
        <p className="all-contests__contest-details__info__description">{description}</p>
      </div> **/}
    </div>
  );
};

export default WithLanguageProps(ContestDetails, ['name', 'description']);
