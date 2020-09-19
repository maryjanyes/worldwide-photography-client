import React from "react";

const IconComponent = ({
  source,
  size,
  onMouseMove,
  onMouseOut,
  containerStyle,
}) => {
  return (
    <div style={containerStyle} className="common-icon">
      <img
        src={source}
        style={{ width: size, height: size }}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
      />
    </div>
  );
};

export default IconComponent;
