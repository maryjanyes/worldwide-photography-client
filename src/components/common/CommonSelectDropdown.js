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
  const dropdownOption = ({ value, valueID }) => {
    return (
      <input
        key={valueID}
        type="text"
        value={value}
        id={valueID}
        onChange={() => {}}
        onMouseDown={() => {
          setValue(value);
          onSelect(valueID, dropdownID);
          toggle(false);
        }}
      />
    );
  };

  return (
      <div className="common-select-dropdown-container" style={containerStyle}>
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
  );
};

export default CommonSelectDropdown;
