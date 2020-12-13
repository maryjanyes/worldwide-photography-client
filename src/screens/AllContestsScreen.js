import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import WithLanguageProps from "components/wrappers/WithLanguageProps";
import ContestDetails from "components/modules/contest/ContestDetails";

import { getTranslationStr } from 'utils/data.util';

const CategoryContests = WithLanguageProps(({ name, contest_category_id, contests, selectContest }) => {
  return contests.length > 0 && (
    <div className="all-contests__category" key={name}>
      <span className="all-contests__category-name">{name}</span>
      <div className="all-contests__category-contests">
        {contests.map(contest => (
          <ContestDetails
            {...contest}
            key={contest_category_id}
            pressItem={selectContest}
            hideContestName={true} />
          )
        )}
      </div>
    </div>
  );
}, ['name']);

function AllContestScreen({ history }) {
  const [contestsByCategories, setContestsByCategories] = useState([]);
  const { contests, contestCategories, translations, activeLanguage } = useSelector(({ contests, ui }) => ({ ...contests, ...ui }));

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
      <span className="page-title">{translations[getTranslationStr('pages.contests_page.title', activeLanguage)]}</span>
      {contests.length > 0 && (
        <div className="all-contests">
          {contestsByCategories.length > 0 && (
            contestsByCategories.map(category => (
              <CategoryContests
                  {...category}
                  history={history}
                  key={category.category_id}
                  selectContest={(contest_id) => history.push(`/contest/${contest_id}`)}
                />
              )
            )) || <p className="no-section-content">{translations[getTranslationStr('pages.common.no_items', activeLanguage)]}</p>}
        </div>
      ) || <p className="no-section-content">No contests at all.</p>}
    </div>
  );
}

export default AllContestScreen;
