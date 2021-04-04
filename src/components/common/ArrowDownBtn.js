import React from "react";

import IconComponent from "components/common/CommonIcon";

const ArrowDownBtn = ({ onPress, label, opened }) => {
  return (
    <button
      onClick={onPress}
      type="button"
      className={`${(opened && "active") || ""} common-select-btn`}
    >
      <label className="common-label">{label}</label>
      <IconComponent source="fa-chevron-down" />
    </button>
  );
};

export default ArrowDownBtn;
