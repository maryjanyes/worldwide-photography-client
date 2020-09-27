import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import WithLanguageProps from "components/common/wrappers/WithLanguageProps";
import ContestsItems from "components/modules/dashboard/ContestItems";

const CategoryContests = WithLanguageProps(({ name, contests, history }) => {
  return (
    <div className="contest-category" key={name}>
      <span className="contest-category-name">{name}</span>
      <div className="contest-category-contests">
        <ContestsItems contestsData={contests} history={history} key={name} />
      </div>
    </div>
  );
});

function AllContestScreen({ history }) {
  const [contestsByCategories, setContestsByCategories] = useState([]);
  const { contests, contestCategories } = useSelector(
    ({ contests }) => contests
  );

  const getContestsByCategories = () => {
    return contestCategories.map((category) => {
      category.contests = contests.filter(
        (contest) => contest.category_id === category.contest_category_id
      );
      return category;
    });
  };

  useEffect(() => {
    setContestsByCategories(getContestsByCategories());
  }, []);

  const canDisplayContests = contests.length > 0;

  return (
    <div className="page page-all-contests">
      <div className="top-line"></div>
      {canDisplayContests &&
        contestsByCategories.map((category) => (
          <div key={category.category_id}>
            <CategoryContests {...category} history={history} />
          </div>
        ))}
    </div>
  );
}

export default AllContestScreen;
