import React, { useState } from "react";

import IconComponent from "components/common/IconComponent";

const ArrowDownBtn = ({ onPress, iconSrc, label, opened }) => {
  return (
    <button
      onClick={onPress}
      type="button"
      className={`${(opened && "active") || ""} common-select-btn`}
    >
      <label className="common-select-dropdown-label">{label}</label>
      <IconComponent source={iconSrc} />
    </button>
  );
};

export default ArrowDownBtn;
