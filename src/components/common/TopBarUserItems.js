import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ApiService } from "services/api.service";
import { appConfigsService } from "services/app-configs.service";

import authActions from "reducers/actions/auth.actions";

const TopBarUserItems = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, translations } = useSelector(({ auth, ui }) => ({ ...auth, ...ui }));
  const [opened, setOpened] = useState(false);
  const topBarRef = React.useRef(null);

  const toggleMenu = () => setOpened(!opened);
  const navigate = to => history.push(to);

  useEffect(() => {
    let outsideRef = document.querySelector('body');

    if (opened) {
      outsideRef.addEventListener('click', e => {
        const clickedIncludes = topBarRef.current.contains(e.target);

        if (!clickedIncludes) {
          setOpened(false);
        }
      });
    }
  }, [opened]);

  const menuItems = ApiService.getMenuItems();
  const userItems = menuItems.filter(item => item.onlyLoggedIn ? isLoggedIn : true);

  const doAction = item => {
    dispatch(authActions[item.action]())
    toggleMenu();
    if (item.action === 'logOut') {
      history.push('/');
    }
  }

  const doNavigate = item => {
    navigate(item.to)
    toggleMenu()
  }

  return (
    <div className="top-bar-user" ref={topBarRef}>
      <button className="menu-icon icon-btn" onClick={toggleMenu} />
      {opened && (
        <ul className="top-bar-user__items">
          {userItems.map(item => (
            <li className="top-bar-user__items_item" key={item.to || item.action}>
              <button onClick={(item.action && (() => doAction(item))) || (() => doNavigate(item))} className="btn btn-link">
                {translations[`${item.name}.${appConfigsService.activeLang.toLowerCase()}`]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopBarUserItems;
