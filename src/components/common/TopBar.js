import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import TopBarSignItems from "./TopBarSignItems";
import TopBarUserItems from "./TopBarUserItems";
import LanguageSwitcher from "./LanguageSwitcher";
import TopBarSearch from "./TopBarSearch";

import { ApiService } from "services/api.service";
import { getTranslationStr } from "utils/data.util";

import Logo from '../../../assets/images/logo.png';

const TopBarComponent = () => {
  const [displayTopLogo] = useState(true)
  const { isLoggedIn, translations, activeLanguage } = useSelector(({ auth, ui }) => ({ ...auth, ...ui }));
  const menuItems = ApiService.getNavLinks();

  return (
    <React.Fragment>
      {displayTopLogo && <Link to='/' className='site-logo__wrapper'>
        <img src={Logo} className="site-logo site-image" />
      </Link>}
      <nav className="nav-header__links">
      <div className="nav-header-left__links">
        <ul className="nav-header__base_menu">
          {menuItems.map(link =>
            !link.disabled && (
              <li key={link.link} className="nav-header__base_menu__item">
                <NavLink
                  isActive={match => !!match}
                  key={link.name}
                  to={link.link}
                  activeClassName="active"
                >{translations[getTranslationStr(link.i18n, activeLanguage)] || link.i18n}</NavLink>
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
    </React.Fragment>
  );
};

export default TopBarComponent;
