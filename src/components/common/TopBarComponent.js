import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import TopBarSignItems from "./TopBarSignItems";
import TopMenu from "./TopMenu";
import LanguageSwitcher from "./LanguageSwitcher";

import { ApiService } from "services/api.service";

const TopBarComponent = () => {
  const [searchActive, setSearchActive] = useState(false);
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  const toggleSearch = () => setSearchActive(!searchActive);

  return (
    <nav className="nav-header nav-header-top">
      <Link className="site-logo" to="/"></Link>
      <LanguageSwitcher />
      <ul className="nav-header-base-menu">
        {ApiService.getNavLinks().map((one) => {
          return (
            <li key={one.link}>
              <NavLink
                isActive={(match) => {
                  return !!match;
                }}
                key={one.name}
                to={one.link}
                className="nav-header-link"
                activeClassName="active"
              >
                {one.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="nav-header-right-links">
        <div className="top-search">
          {searchActive && (
            <input
              type="text"
              placeholder="Search globally"
              className="common-input"
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
