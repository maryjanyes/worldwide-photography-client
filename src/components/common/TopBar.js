import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import TopBarSignItems from "./TopBarSignItems";
import TopBarUserItems from "./TopBarUserItems";
import LanguageSwitcher from "./LanguageSwitcher";
import TopBarSearch from "./TopBarSearch";

import { ApiService } from "services/api.service";
import { getTranslationStr } from "utils/data.util";

const TopBarComponent = () => {
  const { isLoggedIn, translations, activeLanguage } = useSelector(({ auth, ui }) => ({ ...auth, ...ui }));

  return (
    <nav className="nav-header__links">
      <div className="nav-header-left__links">
        <ul className="nav-header__base_menu">
          {ApiService.getNavLinks().map(link =>
            !link.disabled && (
              <li key={link.link}>
                <NavLink
                  isActive={match => !!match}
                  key={link.name}
                  to={link.link}
                  className="nav-header__base_menu__item"
                  activeClassName="active"
                >{translations[getTranslationStr(link.i18n, activeLanguage)]}</NavLink>
              </li>
            )
          )}
          <LanguageSwitcher active={activeLanguage} />
        </ul>
      </div>
      <div className="nav-header-right__links">
        <TopBarSearch />
        {isLoggedIn ? <TopBarUserItems /> : <TopBarSignItems />}
      </div>
    </nav>
  );
};

export default TopBarComponent;
