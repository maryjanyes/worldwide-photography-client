import React from 'react';

const Tag = props => {
    return (
        <div className="tag-container">
            <span style={props.tagStyle}>{props.name}</span>
            {props.tagIcon && <p>icon</p>}
        </div>
    );
};

export default Tag;
