import React from "react";

const CommonCheckbox = ({ name, label, onChange, isChecked }) => {
  return (
    <div className="form-field common-checkbox-field">
      <input
          className="common-checkbox"
          type="checkbox"
          name={name}
          // id={name}
          checked={isChecked}
          onChange={(change) => onChange(change.target.checked)}
        />
        <label htmlFor={name} className="common-checkbox-label">
          {label}
        </label>
    </div>
  );
};

export default CommonCheckbox;
