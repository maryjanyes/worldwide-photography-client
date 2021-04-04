import React from "react";

const IconComponent = ({
  source,
  description,
  onMouseMove,
  onMouseOut,
  onClick,
  containerStyle,
  size,
}) => {
  return (
    <div
      title={description}
      style={containerStyle}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      <i className={`fa ${source}`} />
    </div>
  );
};

export default IconComponent;
