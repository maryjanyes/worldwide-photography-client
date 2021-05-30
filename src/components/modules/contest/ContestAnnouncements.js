import React from "react";
import { useSelector } from "react-redux";

import { getTranslationStr } from "../../../utils/data.util";

const ContestAnnouncements = () => {
  const { contestAnnouncements, activeLanguage, translations } = useSelector(({ contests, ui }) => ({ ...contests, ...ui }));

  return contestAnnouncements.length && (
    <div className="contest-announcements">
      {contestAnnouncements.map(item => (
        <ContestAnnouncement
          {...item}
          lang={activeLanguage}
          key={item.title}
        />
      ))}
    </div>
  ) || <p>{translations[getTranslationStr("common.messages.no_announcements", activeLanguage)]}</p>
};

const ContestAnnouncement = ({ created_at, content, lang }) => {
  const getContent = () => {
    return lang === 'EN' ?
      content[0] : content[1];
  };

  const announceContent = getContent();

  return (
    <div className="contest-announcement" key={announceContent.title}>
      <p className="contest-announcement__title">{announceContent.title}</p>
      <p className="contest-announcement__content">{announceContent.content}</p>
      <p className="contest-announcement__timestamp">{created_at}</p>
    </div>
  );
};

export default ContestAnnouncements;
