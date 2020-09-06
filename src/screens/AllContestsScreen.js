import React from "react";
import { useSelector } from "react-redux";

import WithLanguageProps from "components/common/wrappers/WithLanguageProps";

const CategoryContest = WithLanguageProps(({ name }) => {
  return (
    <div className="contest-category">
      <span className="contest-category-name">{name}</span>
    </div>
  );
});

function AllContestScreen() {
  const { contests, contestCategories } = useSelector(
    ({ contests }) => contests
  );
  const canDisplayContests = contests.length > 0;

  const getContestsByCategories = () => {
    return contestCategories.map((c) => {
      const contestsByCategory = contests.filter(
        (co) => co.category_id === c.contest_category_id
      );
      c.contests = contestsByCategory;
      return c;
    });
  };

  const categories = getContestsByCategories();

  return (
    <div className="page page-all-contests">
      <div className="top-line"></div>
      {canDisplayContests &&
        categories.map((category) => {
          return category.contests.map((c) => <CategoryContest {...c} />);
        })}
    </div>
  );
}

export default AllContestScreen;
