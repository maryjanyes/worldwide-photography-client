import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ApiService } from "services/api.service";
import WithLanguageProps from "components/common/wrappers/WithLanguageProps";

const ContestCategories = () => {
  const { contestCategories } = useSelector(({ contests }) => contests);
  const [categoriesActive, setCategories] = useState(false);
  const needToDisplayCategories =
    categoriesActive && contestCategories.length > 0;

  const toggleCategories = () => setCategories(!categoriesActive);

  return (
    <div className="contest-categories-nav">
      <ul className="contest-categories-nav-links">
        {ApiService.getContestItemLinks().map((one) => {
          return (
            <li className="nav-link-container" key={one.name}>
              {one.link ? (
                <Link className="nav-link" to={one.link}>
                  {one.name}
                </Link>
              ) : (
                <button
                  className="btn-link nav-link"
                  onClick={toggleCategories}
                >
                  {one.name}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {needToDisplayCategories && (
        <ul className="contest-categories-items">
          {contestCategories.map((c) => {
            return <CategoryItemLink {...c} />;
          })}
        </ul>
      )}
    </div>
  );
};

export const CategoryItemLink = WithLanguageProps((props) => {
  return (
    <li className="nav-link-container" key={props.name}>
      <Link
        className="nav-link"
        to={`/contest-categories/${props.category_id}`}
      >
        {props.name}
      </Link>
    </li>
  );
});

export default ContestCategories;
