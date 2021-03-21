import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppNavigation from "./navigation";

import { initAppData } from "./redux/actions/app.index";

const AppContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAppData(dispatch));
  }, []);

  return (
    <div className="app-wrapper" id="appWrapper">
      <AppNavigation />
    </div>
  );
};

export default AppContainer;
