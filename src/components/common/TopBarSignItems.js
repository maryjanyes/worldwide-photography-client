import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ApiService } from "services/api.service";
import { getTranslationStr } from "utils/data.util";

const TopBarSignItems = () => {
  const { translations, activeLanguage } = useSelector(({ ui }) => ui);

  return (
    <ul className="top-bar-sign__items">
      {ApiService.getSignItems().map(item => {
        return (
          <li key={item.action} className="top-bar-sign__items_item">
            <Link to={item.action} className={item.action}>
              {translations[getTranslationStr(item.i18n, activeLanguage)]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TopBarSignItems;
