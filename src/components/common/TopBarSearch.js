import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getTranslationStr } from "utils/data.util";

import { apiService } from "services/api.service";

const TopBarSearch = () => {
    const [isActive, setIsActive] = useState(false);
    const [searchedItems, setSearchedItems] = useState([]);
    const [searchReqTimeoutPassed, setSearchReqTimeoutPassed] = useState(true);

    const routerHistory = useHistory();
  
    const toggleSearch = () => {
      if (isActive) {
        setSearchedItems([]);
      }
    
      setIsActive(!isActive);
    };

    const activateSearch = async event => {
      const textToSearch = event.nativeEvent?.target?.value;

      if (textToSearch?.length > 1 && searchReqTimeoutPassed) {

        setSearchReqTimeoutPassed(false);
  
        const response = (await apiService.search(textToSearch)).data;
  
        setSearchedItems(response || []);

        const $int = setInterval(() => {
          setSearchReqTimeoutPassed(true);
          clearInterval($int);
        }, 5000);
      }
    };

    const navigateItem = (item) => {
      if (item.title) {
        routerHistory.push('/articles/all/' + item.article_id);
      } else {
        routerHistory.push('/contests/all/' + item.contest_id);
      }

      setSearchedItems([]);
    };
  
    const { translations, activeLanguage } = useSelector(({ ui }) => ui);

    return (
        <div className="top-search">
          {isActive && (
            <input
              type="text"
              placeholder={translations[getTranslationStr("common.placeholders.top_search", activeLanguage)]}
              className="common-input top-search__input"
              onChange={value => activateSearch(value)}
            />
          )}
          <button className="search-icon icon-btn" onClick={toggleSearch} />
          {searchedItems.length > 0 && (
            <div className="search-results">
              {searchedItems.map(item => (
                <div className="search-results__item" key={item.contest_id || item.article_id} onClick={() => navigateItem(item)}>
                  <span>{translations[getTranslationStr(item.name || item.title, activeLanguage)]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
    );
}

export default TopBarSearch;
