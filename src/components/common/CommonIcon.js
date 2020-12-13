import React from "react";

const IconComponent = ({
  source,
  size,
  description,
  alt,
  onMouseMove,
  onMouseOut,
  onClick,
  containerStyle,
  superClass,
}) => {
  return (
    <div style={containerStyle} className={`icon-common${superClass && ' ' + superClass || ''}`}>
      <img
        src={source}
        style={{ width: size, height: size }}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onClick={onClick}
        alt={alt}
        title={description}
      />
    </div>
  );
};

export default IconComponent;
