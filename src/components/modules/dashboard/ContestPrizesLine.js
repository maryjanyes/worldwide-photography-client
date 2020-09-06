import React from "react";
import { useSelector } from "react-redux";

import WithCarouselRef from "components/common/wrappers/WithCarouselRef";
import { CategoryItemLink } from "components/modules/dashboard/ContestCategories";

const PrizesLine = () => {
  const { contestPrizes, contests } = useSelector(({ contests }) => contests);
  const canDisplayPrizesLine = contestPrizes.length > 0 && contests.length > 0;

  return (
    <div className="prizes-line">
      {canDisplayPrizesLine && (
        <WithCarouselRef speed={2000}>
          {contestPrizes.map((prize) => {
            const contestData = contests.find(
              (c) => c.contest_id === prize.contest_id
            );
            return (
              !!contestData && (
                <div
                  className="prize-item item"
                  key={prize.name || Math.random()}
                >
                  <p className="prize-name">
                    <span>{prize.name}</span>
                  </p>
                  <img
                    src={
                      prize.avatar ||
                      "http://localhost:3000/assets/images/camera1.png"
                    }
                    alt={prize.name}
                    className="prize-image"
                  />
                  <CategoryItemLink {...contestData} />
                </div>
              )
            );
          })}
        </WithCarouselRef>
      )}
    </div>
  );
};

export default PrizesLine;
