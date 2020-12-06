import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ApiService } from "services/api.service";
import WithLanguageProps from "components/wrappers/WithLanguageProps";

const ContestCategoriesNav = () => {
  const {
    contestCategories,
    translations,
    activeLanguage,
  } = useSelector(({ contests, ui }) => ({ ...contests, ...ui }));
  const [categoriesActive, setCategoriesActive] = useState(false);
  const toggleCategories = () => setCategoriesActive(!categoriesActive);

  return (
    <div className="contest-categories__nav">
      <ul className="contest-categories__nav_links">
        {ApiService.getContestItemLinks().map(link => {
          return (
            <li className="contest-categories__nav_link" key={link.link}>
              {link.link ? (
                <Link to={link.link}>
                  {translations && translations[`${link.i18n}.${activeLanguage.toLowerCase()}`]}
                </Link>
              ) : (
                <button
                  className="btn-link nav-link"
                  onClick={toggleCategories}
                >{link.name}</button>
              )}
            </li>
          );
        })}
      </ul>
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
}, ['name', 'description']);

export default ContestCategoriesNav;
