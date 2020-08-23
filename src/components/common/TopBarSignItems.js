import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ApiService } from "services/api.service";

const TopBarSignItems = () => {
  const { activeNavItem } = useSelector(({ ui }) => ui);
  return (
    <ul className="sign-top-menu">
      {ApiService.getSignItems().map((one) => {
        return (
          <li key={one.action}>
            <Link
              to={one.action}
              className={`${one.action} sign-top-menu-link`}
            >
              {one.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TopBarSignItems;
