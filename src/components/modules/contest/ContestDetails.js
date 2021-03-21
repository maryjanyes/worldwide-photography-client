import React from "react";

import WithLanguageProps from "components/wrappers/WithLanguageProps";

import { pathToPhoto } from "utils/data.util";
import defaultImages from "mocks/default-images";

const ContestDetails = ({ photo_path, name, contest_id, hideContestName, pressItem }) => {
  return (
    <div className="category-contest" onClick={() => pressItem(contest_id)}>
      <img className="contest-image site-image" src={pathToPhoto(photo_path, null, false, defaultImages.contest)} />
      {!hideContestName && <p className="contest-name">{name}</p>}
    </div>
  );
};

export default WithLanguageProps(ContestDetails, ['name', 'description']);
