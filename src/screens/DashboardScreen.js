import React from "react";

import BannerSlider from "components/modules/dashboard/BannerSlider";
import ContestItems from "components/modules/dashboard/ContestItems";
import ContestPrizesLine from "components/modules/dashboard/ContestPrizesLine";
import ContestCategories from "components/modules/dashboard/ContestCategories";

function DashboardScreen(props) {
  return (
    <div className="page page-dashboard">
      <ContestCategories />
      <BannerSlider />
      <ContestItems history={props.history} />
      <ContestPrizesLine />
    </div>
  );
}

export default DashboardScreen;
