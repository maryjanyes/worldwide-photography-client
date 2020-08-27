import React from "react";
import { useDispatch } from "react-redux";

import appConfigsService, { appLangs } from "services/app-configs.service";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();

  return (
    <div className="language-switcher">
      <button
        onClick={() => appConfigsService.selectAppLang(appLangs.UA, dispatch)}
      >
        UA
      </button>
      <button
        onClick={() => appConfigsService.selectAppLang(appLangs.EN, dispatch)}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
