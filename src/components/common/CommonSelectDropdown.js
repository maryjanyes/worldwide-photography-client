import React, { useState } from "react";

import ArrowDownBtn from "components/common/ArrowDownBtn";

import { apiService } from "services/api.service";

const CommonSelectDropdown = ({
  label,
  values,
  onSelect,
  dropdownID,
  containerStyle = {},
}) => {
  const [isOpen, toggle] = useState(false);
  const [value, setValue] = useState(null);
  const dropdownOption = ({ valueText, valueID }) => {
    return (
      <input
        key={valueID}
        type="text"
        value={valueText}
        id={valueID}
        onChange={() => {}}
        onMouseDown={() => {
          setValue(valueText);
          onSelect(valueID, dropdownID);
          toggle(false);
        }}
      />
    );
  };

  return (
    <div className="common-select-dropdown-form-field" style={containerStyle}>
      <div className="common-select-dropdown-box">
        <ArrowDownBtn
          onPress={() => toggle(!isOpen)}
          iconSrc={`${apiService.CLIENT_ENDPOINT}/assets/icons/baseline_keyboard_arrow_up_black_18dp.png`}
          label={value || label}
          opened={isOpen}
        />
        {isOpen && (
          <div className="common-select-dropdown-options">
            {values.map((f) => dropdownOption(f))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonSelectDropdown;
