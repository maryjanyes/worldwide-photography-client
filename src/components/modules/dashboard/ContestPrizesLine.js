import React from "react";
import { useSelector } from "react-redux";

import WithCarouselRef from "components/common/wrappers/WithCarouselRef";
import { CategoryItemLink } from "components/modules/dashboard/ContestCategories";

import { getOneFromData, pathToAsset } from "utils/data.util";

const PrizesLine = () => {
  const { contestPrizes, contests } = useSelector(({ contests }) => contests);
  const canDisplayPrizesLine = contestPrizes.length > 0 && contests.length > 0;

  return (
    <div className="prizes-items">
      {canDisplayPrizesLine && (
        <WithCarouselRef speed={2000}>
          {contestPrizes.map((prize) => {
            const contestData = getOneFromData(
              contests,
              prize.contest_id,
              "contest_id"
            );
            return (
              <div key={prize.contest_prize_id}>
                <PrizeItem {...prize} />
                {!!contestData && <CategoryItemLink {...contestData} />}
              </div>
            );
          })}
        </WithCarouselRef>
      )}
    </div>
  );
};

const PrizeItem = ({ title, amount, is_money, photo_path }) => {
  return (
    <div className="prize-item">
      <div className="prize-item-heading">
        <span className="prize-item-name">{title}</span>
        <div className="prize-item-icon"></div>
      </div>
      <img
        className="prize-item-image"
        src={pathToAsset(photo_path, "baseline_emoji_events_black_18dp.png")}
      />
      {is_money && <span className="prize-item-amount">{amount}</span>}
    </div>
  );
};

export default PrizesLine;
