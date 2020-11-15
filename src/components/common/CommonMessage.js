import React from "react";

const CommonMessage = ({ text, theme }) => {
  return (
    <div className={`notification-message${theme && '\n' + theme || ''}`}>
      <p>{text}</p>
    </div>
  );
};

export default CommonMessage;
