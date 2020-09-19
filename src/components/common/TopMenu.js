import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ApiService } from "services/api.service";
import appConfigs from "services/app-configs.service";

import authActions from "reducers/actions/auth.actions";

const TopMenu = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(({ auth }) => auth);
  const [opened, setOpened] = useState(false);
  const menuItems = ApiService.getMenuItems();

  const toggleMenu = () => setOpened(!opened);

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
              className="top-menu-item"
              key={item[`${appConfigs.activeLang}_name`]}
            >
              <button
                onClick={() => dispatch(authActions[item.action]())}
                className="btn btn-link"
              >
                {item[`${appConfigs.activeLang}_name`]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopMenu;
