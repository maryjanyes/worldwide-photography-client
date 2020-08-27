import React from "react";
import { useSelector } from "react-redux";

function AllContestScreen() {
  const { contests } = useSelector(({ contests }) => contests);
  const canDisplayContests = contests.length > 0;

  return (
    <div className="page page-all-contests">
      <div className="top-line"></div>
      {(canDisplayContests && contests.map((c) => <p>{c.ua_name}</p>)) || (
        <p>No contests.</p>
      )}
    </div>
  );
}

export default AllContestScreen;
