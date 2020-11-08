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
        announcements.map((announcement) => (
          <ContestAnnouncement {...announcement} key={announcement.title} />
        ))) || <p>No Announcements finded for this Contest.</p>}
    </div>
  );
};

const ContestAnnouncement = ({ title, text }) => {
  return (
    <div className="contest-announcement">
      <span className="contest-announcement__title">{title}</span>
      <span className="contest-announcement__content">{text}</span>
    </div>
  );
};

export default ContestAnnouncements;
