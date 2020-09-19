import React from "react";

const Message = ({ text }) => {
  return (
    <div className="notification-message">
      <p>{text}</p>
    </div>
  );
};

export default Message;
