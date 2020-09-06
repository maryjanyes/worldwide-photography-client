import React from "react";
import { useSelector } from "react-redux";

import { getAnnouncements } from "utils/data.util";

const ContestAnnouncements = ({ contestID }) => {
  const { allArticles } = useSelector(({ articles }) => articles);
  const announcements = getAnnouncements(allArticles, contestID);
  const canDisplayAnnouncements = announcements.length > 0;

  return (
    <div className="contest-announcements">
      {(canDisplayAnnouncements &&
        announcements.map((one) => (
          <div className="contest-announcement">
            <span>{one.title}</span>
          </div>
        ))) || <p>No Announcements finded for this Contest.</p>}
    </div>
  );
};

export default ContestAnnouncements;
