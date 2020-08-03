import React from 'react';

const IconComponent = ({ source, size }) => {
    return <img src={source} style={{ width: size, height: size }} />;
};

export default IconComponent;
