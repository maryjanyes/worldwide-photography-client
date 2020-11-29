import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import WithLanguageProps from "components/wrappers/WithLanguageProps";
import ContestDetails from "components/modules/contest/ContestDetails";

const CategoryContests = WithLanguageProps(({ name, contests }) => {
  return (
    <div className="contest-category" key={name}>
      <span className="contest-category__name">{name}</span>
      <div className="contest-category__contests">
        {contests.map(contest => <ContestDetails {...contest} key={name} />)}
      </div>
    </div>
  );
}, ['name']);

function AllContestScreen({ history }) {
  const [contestsByCategories, setContestsByCategories] = useState([]);
  const { contests, contestCategories } = useSelector(({ contests }) => contests);

  const getContestsByCategories = () => {
    return contestCategories && contestCategories.map(category => {
      category.contests = (contests || []).filter(contest => contest.category_id === category.contest_category_id);
      return category;
    }) || [];
  };

  useEffect(() => {
    setContestsByCategories(getContestsByCategories());
  }, [contests, contestCategories]);

  return (
    <div className="page page-all-contests">
      <div className="top-line"></div>
      <span className="page-title">All Contests</span>
      {contests.length > 0 && (
        <div className="all-contests">
          {contestsByCategories.length > 0 && (
            contestsByCategories.map((category) => (
              <div key={category.category_id} className="all-contests__category">
                <CategoryContests
                  {...category}
                  history={history}
                  key={category.category_id}
                />
              </div>
            ))
          ) || <p className="no-section-content">No contest categories.</p>}
        </div>
      ) || <p className="no-section-content">No contests in categories.</p>}
    </div>
  );
}

export default AllContestScreen;
