import React, { useState } from 'react';

const ExpanderTab = ({ children, Header }) => {
    const [isExpanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!isExpanded);

    return (
        <div className="expander-tab">
            <div className="expander-header">
                {Header ?
                    <Header toggle={toggleExpand} /> :
                    <React.Fragment />
                }
            </div>
            {isExpanded && (
                <div className="expander-content">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ExpanderTab;
