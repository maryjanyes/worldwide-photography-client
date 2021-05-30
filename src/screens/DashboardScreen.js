import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import ContestItems from "components/modules/dashboard/ContestItems";
import ContestPrizesLine from "components/modules/dashboard/ContestPrizesLine";
import NextSectionJumper from "components/modules/dashboard/NextSectionJumper/NextSectionJumper";

import { getTranslationStr } from "utils/data.util";

const DashboardScreen = (props) => {
  const bottomRef = useRef(null);
  const [isBottomSectionSelected, setIsBottomSelected] = useState(false);

  const { activeLanguage, translations } = useSelector(({ ui }) => ui);

  useEffect(() => {
    const isBottom = props.history.location.search === '?bottom=true';
    if (isBottom && bottomRef?.current) {
      setIsBottomSelected(true);
      setTimeout(() => {
        bottomRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      }, 1000);
    }
  }, [props.history.location]);

  return (
    <div className="page page-dashboard">
      {/** <ContestCategoriesNav /> **/}
      <div className="page-dashboard__container">
        <div className="page-dashboard__container_top">
          <div className="page-dashboard__container_top-info">
            <p>WorldwidePhotography</p>
            <p>{translations[getTranslationStr('common.site_description', activeLanguage)]}</p>
            <button
              onClick={() => props.history.push('/sign-in')}
              className="join-btn"
              dangerouslySetInnerHTML={{ __html: translations[getTranslationStr('common.join_us_btn', activeLanguage)] }}
            />
          </div>
          <div className="page-dashboard__image" />
        </div>
        {!isBottomSectionSelected && <NextSectionJumper history={props.history} selectHash="bottom" />}
        {isBottomSectionSelected && <div className="page-dashboard__container_bottom">
          <ContestItems history={props.history} />
          <ContestPrizesLine history={props.history} />
        </div>}
        <input ref={bottomRef} className={`bottom-input__ref${isBottomSectionSelected && ' active' || ''}`} />
      </div>
    </div>
  );
}

export default DashboardScreen;
