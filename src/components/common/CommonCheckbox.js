import React from "react";

const CommonCheckbox = ({ name, label, onChange }) => {
  return (
    <div className="common-checkbox-form-field">
      <div className="common-checkbox-box">
        <input
          className="common-checkbox"
          type="checkbox"
          name={name}
          id={name}
          onChange={(change) => onChange(change.target.checked)}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    </div>
  );
};

export default CommonCheckbox;
