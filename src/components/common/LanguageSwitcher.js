import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { appConfigsService, appLangs } from "services/app-configs.service";

const LanguageSwitcher = ({ active }) => {
  const [isSelect, setIsSelect] = useState(false)
  const dispatch = useDispatch();

  const setLang = code => {
    appConfigsService.selectAppLang(code, dispatch)
    if (isSelect) {
      setIsSelect(false)
    }
  };

  const toggleSelect = () => {
    setIsSelect(!isSelect)
  }

  return (
    <div className="language-switcher">
      <div className="language-switcher__active" onClick={toggleSelect}>
        <span>{active}</span>
      </div>
      {isSelect && <div className="language-switcher__select">
        <button
          onClick={() => setLang(appLangs.UA)}
        >UA</button>
        <button
          onClick={() => setLang(appLangs.EN)}
        >EN</button>
      </div>}
    </div>
  );
};

export default LanguageSwitcher;
