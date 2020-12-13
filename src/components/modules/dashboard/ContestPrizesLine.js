import React from "react";
import { useSelector } from "react-redux";

import WithCarouselRef from "components/wrappers/WithCarouselRef";
import WithLanguageProps from 'components/wrappers/WithLanguageProps';

import { pathToAsset } from "utils/data.util";

const ContestPrizesLine = ({ history }) => {
  const { contestPrizes, contests } = useSelector(({ contests }) => contests);
  const canDisplayPrizesLine = contestPrizes.length > 0 && contests.length > 0;

  const navigateToContest = contestId => {
    history.push(`/contest/${contestId}`);
  };

  return (
    <div className="prizes-items">
      {canDisplayPrizesLine && (
        <WithCarouselRef speed={2000}>
          {contestPrizes.map(prize => <PrizeItem {...prize} navigate={navigateToContest} />)}
        </WithCarouselRef>
      )}
    </div>
  );
};

const PrizeItem = WithLanguageProps(({ title, amount, is_money, photo_path, navigate, contest_id }) => {
  const getContestPage = () => navigate(contest_id);

  return (
    <div className="prize-item" key={contest_id}>
      <div className="prize-item__heading">
        <span className="prize-name">{title}</span>
        <div className="prize-icon"></div>
      </div>
      <img
        className="prize-item__image"
        src={pathToAsset(photo_path, "baseline_emoji_events_black_18dp.png")}
        onClick={getContestPage}
      />{is_money && <span className="prize-item-amount">{amount}$</span>}
    </div>
  );
}, ['title']);

export default ContestPrizesLine;
