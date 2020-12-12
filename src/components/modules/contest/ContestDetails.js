import React from "react";

import WithLanguageProps from "components/wrappers/WithLanguageProps";

import { pathToPhoto } from "utils/data.util";

const ContestDetails = ({ photo_path, name, pressItem, contest_id, hideContestName }) => {
  return (
    <div className="category-contest" onClick={() => pressItem(contest_id)}>
      <img className="contest-image" src={pathToPhoto(photo_path)} />
      {!hideContestName && <p className="contest-name">{name}</p>}
    </div>
  );
};

export default WithLanguageProps(ContestDetails, ['name', 'description']);
