import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import WithLanguageProps from "components/wrappers/WithLanguageProps";
import ContestDetails from "components/modules/contest/ContestDetails";

import { getTranslationStr } from 'utils/data.util';

const CategoryContests = WithLanguageProps(({ name, contest_category_id, contests, selectContest, toggleCategoryVisibility, visible }) => {
  return contests.length > 0 && (
    <div className="all-contests__category" key={name}>
      <p className="all-contests__category-name" onClick={() => toggleCategoryVisibility(contest_category_id-1)}>{name}</p>
      {visible && <div className="all-contests__category-contests">
        {contests.map(contest => (
          <ContestDetails
            {...contest}
            key={Math.random() * 100}
            pressItem={selectContest}
            hideContestName={true} />
          )
        )}
      </div>}
    </div>
  );
}, ['name']);

function AllContestScreen({ history }) {
  const [contestsByCategories, setContestsByCategories] = useState([]);
  const [contestsByCategoriesVisibility, setContestsByCategoriesVisibility] = useState([])
  const { contests, contestCategories, translations, activeLanguage } = useSelector(({ contests, ui }) => ({ ...contests, ...ui }));

  const getContestsByCategories = () => {
    return contestCategories && contestCategories.map(category => {
      category.contests = (contests || []).filter(contest => contest.category_id === category.contest_category_id);
      return category;
    }).filter(c => c.contests.length > 0) || [];
  };

  useEffect(() => {
    const newContests = getContestsByCategories();
    setContestsByCategories(newContests);
    setContestsByCategoriesVisibility(newContests.map(() => true));
  }, [contests, contestCategories]);

  const toggleCategoryVisibility = categoryID => {
    const newVisibility = contestsByCategoriesVisibility.map((v, category_id) => {
      if (category_id === categoryID) {
        v = !v;
      } else {
        v = true;
      }
      return v;
    });
    setContestsByCategoriesVisibility(newVisibility);
  };

  return (
    <div className="page page-all-contests">
      <div className="top-line"></div>
      <span className="page-title">{translations[getTranslationStr('pages.contests_page.title', activeLanguage)]}</span>
      {contests.length > 0 && (
        <div className="all-contests">
          {contestsByCategories.length > 0 && (
            contestsByCategories.map((category, category_id) => (
              <CategoryContests
                  {...category}
                  history={history}
                  key={category.contest_category_id}
                  selectContest={(contest_id) => history.push(`/contests/all/${contest_id}`)}
                  toggleCategoryVisibility={toggleCategoryVisibility}
                  visible={contestsByCategoriesVisibility[category_id]}
                />
              )
            )) || <p className="no-section-content">{translations[getTranslationStr('pages.common.no_items', activeLanguage)]}</p>}
        </div>
      ) || <p className="no-section-content">No contests at all.</p>}
    </div>
  );
}

export default AllContestScreen;
