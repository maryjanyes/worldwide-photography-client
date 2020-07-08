import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import TopBarSignItems from './TopBarSignItems';
import TopMenu from './TopMenu';

import { ApiService, apiService } from 'services/api.service';

const TopBarComponent = () => {
    const [searchActive, setSearchActive] = useState(false);
    const { isLoggedIn } = useSelector(({ users }) => users);
    const toggleSearch = () => setSearchActive(!searchActive);
    return (
        <nav className="nav-header nav-header-top">
            <div className="site-logo"></div>
            <ul className="nav-header-base-menu">
                {ApiService.getNavLinks().map(one => {
                    return (
                        <li key={one.link}>
                            <NavLink
                                isActive={(match) => {
                                    if (match) return true;
                                }}
                                key={one[apiService.active]}
                                to={one.link}
                                className="nav-header-link"
                                activeClassName="active"
                            >{one[apiService.active]}</NavLink>
                        </li>
                    );
                })}
            </ul>
            <div className="nav-header-right-links">
                <div className="top-search">
                    {searchActive && <input type="text" placeholder="Search globally.." className="common-input" />}
                    <button className="search-icon icon-btn" onClick={toggleSearch} />
                </div>
                {!isLoggedIn && <TopBarSignItems />}
                <TopMenu />
            </div>
        </nav>
    );
};

export default TopBarComponent;
