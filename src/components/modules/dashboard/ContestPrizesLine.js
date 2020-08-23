import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import WithCarouselRef from "components/common/wrappers/WithCarouselRef";

const PrizesLine = () => {
  const { contestPrizes, contests } = useSelector(({ contests }) => contests);

  const getContest = ({ contest_id }) => {
    return contests.find((one) => one.contest_id === contest_id);
  };

  const canShow = contestPrizes.length > 0 && contests.length > 0;

  return (
    <div className="prizes-line">
      {canShow && (
        <WithCarouselRef speed={2000}>
          {contestPrizes.map((prize) => {
            const contest = {};
            return (
              contest && (
                <div className="prize-item item" key={prize.name}>
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
                  <p className="prize-contest-name">
                    <Link
                      to={`/contest/${contest.contest_id}`}
                      className="prize-contest-link"
                    >
                      `{contest ? contest.name : ""}`
                    </Link>
                  </p>
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
