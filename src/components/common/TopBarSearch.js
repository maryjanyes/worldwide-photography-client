import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getTranslationStr } from "utils/data.util";

const TopBarSearch = () => {
    const [isActive, setIsActive] = useState(false);
  
    const toggleSearch = () => setIsActive(!isActive);

    const { translations, activeLanguage } = useSelector(({ ui }) => ui);

    return (
        <div className="top-search">
          {isActive && (
            <input
              type="text"
              placeholder={translations[getTranslationStr("common.placeholders.top_search", activeLanguage)]}
              className="common-input top-search__input"
            />
          )}
          <button className="search-icon icon-btn" onClick={toggleSearch} />
        </div>
    );
}

export default TopBarSearch;
