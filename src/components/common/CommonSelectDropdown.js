import React, { useState } from "react";

const CommonSelectDropdown = ({
  label,
  values,
  onSelect,
  dropdownID,
  containerStyle = {},
}) => {
  const [isOpen, toggle] = useState(false);
  const dropdownOption = ({ valueText, valueID }) => {
    return (
      <input
        key={valueID}
        type="text"
        value={valueText}
        id={valueID}
        onChange={() => {}}
        onMouseDown={() => {
          onSelect(valueID, dropdownID);
          toggle(false);
        }}
      />
    );
  };

  return (
    <div className="common-select-dropdown-form-field" style={containerStyle}>
      <div className="common-select-dropdown-box">
        <button onClick={() => toggle(!isOpen)} type="button">
          <label className="common-select-dropdown-label">{label}</label>
        </button>
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
