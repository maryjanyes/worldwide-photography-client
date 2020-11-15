import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ApiService } from "services/api.service";
import { getTranslationStr } from "utils/data.util";

const TopBarSignItems = () => {
  const { translations, activeLanguage } = useSelector(({ ui }) => ui);

  return (
    <ul className="sign-top-menu">
      {ApiService.getSignItems().map(item => {
        return (
          <li key={item.action}>
            <Link
              to={item.action}
              className={`${item.action} sign-top-menu-link`}
            >
              {translations[getTranslationStr(item.i18n, activeLanguage)]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TopBarSignItems;
