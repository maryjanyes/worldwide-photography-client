import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { getContestImage } from "utils/data.util";

import WithCarouselRef from "components/common/wrappers/WithCarouselRef";

const ContestItem = ({
  name,
  description,
  contest_id,
  started_at,
  exploreContest,
  avatar_id,
}) => {
  const { contestImages } = useSelector(({ contests }) => contests);

  const buildContestStatusLabel = () => {
    return started_at > Date.now() ? (
      <div className="contest-status coming">Starts soon</div>
    ) : (
      <div className="contest-status active">Active</div>
    );
  };

  const contestAvatar = () => {
    return getContestImage(contestImages, avatar_id);
  };

  return (
    <div className="item contest-item" key={contest_id}>
      <h4 className="contest-item-card">
        <div
          className="contest-item-card-header"
          style={{
            backgroundImage: `url(${contestAvatar()}`,
          }}
        >
          {buildContestStatusLabel()}
        </div>
        <div className="contest-item-card-body">
          <p className="contest-name">{name}</p>
          <p className="contest-description">{description}</p>
          <button
            onClick={() => exploreContest(contest_id)}
            className="btn btn-simple btn-explore-contest"
          >
            Explore
          </button>
        </div>
      </h4>
    </div>
  );
};

const ContestItems = ({ history, contestItems = null }) => {
  const { contests } = useSelector(({ contests }) => contests);
  const data = useMemo(() => contestItems || contests, [contests]);

  const exploreContest = (contest_id) => {
    history.push(`/contest/${contest_id}`);
  };

  const canShow = data.length > 0;

  return (
    <div className="contest-items">
      {canShow && (
        <WithCarouselRef speed={4000}>
          {data.map((one, contestItemID) => (
            <ContestItem
              {...one}
              exploreContest={exploreContest}
              key={contestItemID}
            />
          ))}
        </WithCarouselRef>
      )}
    </div>
  );
};

export default ContestItems;
