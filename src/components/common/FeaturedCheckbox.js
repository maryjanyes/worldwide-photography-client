import React from "react";

const FeaturedCheckbox = ({ name, label, onChange }) => {
  return (
    <div className="form-field-checkbox">
      <div className="box">
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

export default FeaturedCheckbox;
