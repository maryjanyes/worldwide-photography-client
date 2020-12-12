import React from "react";

const CommonCheckbox = ({ name, label, onChange, isChecked }) => {
  return (
    <div className="form-field common-checkbox__field">
      <input
          className="common-checkbox__input"
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={change => onChange(change.target.checked)}
        />
        <label htmlFor={name} className="common-checkbox__label">
          {label}
        </label>
    </div>
  );
};

export default CommonCheckbox;
