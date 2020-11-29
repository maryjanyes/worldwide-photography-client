import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import WithCarouselRef from "components/wrappers/WithCarouselRef";
import WithLanguageProps from "components/wrappers/WithLanguageProps";

import { isContestStarted, pathToPhoto, getTranslationStr } from "utils/data.util";

const ContestItem = WithLanguageProps(
  ({ name, description, contest_id, started_at, explore, photo_path }) => {
    const { translations, activeLanguage } = useSelector(({ ui }) => ui);
    const contestAvatar = pathToPhoto(photo_path);
  
    const contestStatusLabel = () => {
      const isHappensNow = isContestStarted(started_at);
      return (
        (isHappensNow && (
        <div className="contest-status happens-now">
          {translations[getTranslationStr('contest_statuses.happens_now', activeLanguage)]}
        </div>
        )) ||
        <div className="contest-status starts-soon">
          {translations[getTranslationStr('contest_statuses.starts_soon', activeLanguage)]}
        </div>
      );
    };

    return (
      <div className="item contest-item" key={contest_id}>
        <h4 className="contest-item-card">
          <div
            className="contest-item-card-header"
            style={{
              backgroundImage: `url(${contestAvatar}`,
            }}
          >
            {contestStatusLabel()}
          </div>
          <div className="contest-item-card-body">
            <p className="contest-name">{name}</p>
            <p className="contest-description">{description}</p>
            <button
              onClick={() => explore(contest_id)}
              className="btn btn-simple btn-explore-contest"
            >
              Explore
            </button>
          </div>
        </h4>
      </div>
    );
  }, ['name', 'description']);

const ContestItems = ({ history, contestsData }) => {
  const [contestItems, setContestItems] = useState([]);
  const { contests } = useSelector(({ contests }) => contests);

  const exploreContest = (contest_id) => {
    history.push(`/contest/${contest_id}`);
  };

  useEffect(() => {
    if (contestsData) {
      setContestItems(contestsData);
    } else setContestItems(contests);
  }, [contestsData, contests]);

  const canDisplayContests = contestItems.length > 0;

  return (
    <div className="contest-items">
      {canDisplayContests && (
        <WithCarouselRef speed={4000}>
          {contestItems.map((contest) => (
            <div key={contest.contest_id}>
              <ContestItem
                {...contest}
                explore={exploreContest}
                key={contest.contest_id}
              />
            </div>
          ))}
        </WithCarouselRef>
      )}
    </div>
  );
};

export default ContestItems;
