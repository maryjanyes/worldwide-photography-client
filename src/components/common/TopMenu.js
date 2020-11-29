import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ApiService } from "services/api.service";
import appConfigs from "services/app-configs.service";

import authActions from "reducers/actions/auth.actions";

const TopMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, translations } = useSelector(({ auth, ui }) => ({ ...auth, ...ui }));
  const [opened, setOpened] = useState(false);

  const toggleMenu = () => setOpened(!opened);
  const navigate = (to) => history.push(to);

  const menuItems = ApiService.getMenuItems();
  const activeItems = menuItems.filter((item) =>
    item.onlyLoggedIn ? isLoggedIn : true
  );

  return (
    <div className="top-menu">
      <button className="menu-icon icon-btn" onClick={toggleMenu} />
      {opened && (
        <ul className="top-menu-items">
          {activeItems.map((item) => (
            <li
              className="top-menu-items__item"
              key={item.to || item.action}
            >
              <button
                onClick={
                  (item.action &&
                    (() => dispatch(authActions[item.action]()))) ||
                  (() => navigate(item.to))
                }
                className="btn btn-link"
              >
                {translations[`${item.name}.${appConfigs.activeLang.toLowerCase()}`]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopMenu;
