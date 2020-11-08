import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { isContestStarted, pathToPhoto } from "utils/data.util";

import WithCarouselRef from "components/common/wrappers/WithCarouselRef";
import WithLanguageProps from "components/common/wrappers/WithLanguageProps";

const ContestItem = WithLanguageProps(
  ({ name, description, contest_id, started_at, explore, photo_path }) => {
    const contestStatusLabel = () => {
      const isStarted = isContestStarted(started_at);
      return (
        (isStarted && (
          <div className="contest-status coming">At Progress</div>
        )) || <div className="contest-status active">Starts Soon</div>
      );
    };

    const contestAvatar = pathToPhoto(photo_path);

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
  }
);

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
