import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import TopBarSignItems from "./TopBarSignItems";
import TopMenu from "./TopMenu";
import LanguageSwitcher from "./LanguageSwitcher";

import { ApiService } from "services/api.service";
import { getTranslationStr } from "utils/data.util";

const TopBarComponent = () => {
  const [searchActive, setSearchActive] = useState(false);
  const { isLoggedIn, translations, activeLanguage } = useSelector(({ auth, ui }) => ({ ...auth, ...ui }));
  const toggleSearch = () => setSearchActive(!searchActive);

  return (
    <nav className="nav-header nav-header-top">
      <Link className="site-logo" to="/" />
      <LanguageSwitcher />
      <ul className="nav-header-base-menu">
        {ApiService.getNavLinks().map((one) => {
          return (
            !one.disabled && (
              <li key={one.link}>
                <NavLink
                  isActive={(match) => !!match}
                  key={one.name}
                  to={one.link}
                  className="nav-header-link"
                  activeClassName="active"
                >
                  {translations[getTranslationStr(one.i18n, activeLanguage)]}
                </NavLink>
              </li>
            )
          );
        })}
      </ul>
      <div className="nav-header-right-links">
        <div className="top-search">
          {searchActive && (
            <input
              type="text"
              placeholder={translations[getTranslationStr("common.placeholders.top_search", activeLanguage)]}
              className="common-input common-input-search"
            />
          )}
          <button className="search-icon icon-btn" onClick={toggleSearch} />
        </div>
        {!isLoggedIn && <TopBarSignItems />}
        {isLoggedIn && <TopMenu />}
      </div>
    </nav>
  );
};

export default TopBarComponent;
