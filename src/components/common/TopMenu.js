import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { ApiService } from "services/api.service";
import appConfigs from "services/app-configs.service";

import authActions from "reducers/actions/auth.actions";

const TopMenu = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const toggleMenu = () => setOpened(!opened);
  const menuItems = ApiService.getMenuItems();

  return (
    <div className="top-menu">
      <button className="menu-icon icon-btn" onClick={toggleMenu} />
      {opened && (
        <ul className="top-menu-items">
          {menuItems.map((item) => (
            <li
              className="top-menu-item"
              key={item[`${appConfigs.activeLang}_name`]}
            >
              <button onClick={() => dispatch(authActions[item.action]())}>
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
