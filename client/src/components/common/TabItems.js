import React, { useState, useEffect } from "react";

function TabItemsHeader({ tabs, selectItem, key }) {
    return tabs.map(one => (
        <button onClick={() => selectItem(one)} className="tab-items-header">
            <p>{one[key]}</p>
        </button>
    ));
}

const TabItems = ({ tabsData }) => {
    const [tabs, setTabs] = useState([]);
    const [selectedItem$, setSelectedItem] = useState(null);
    const selectItem = one => {
        setSelectedItem(one.build(one));
    };
    useEffect(() => {
        setTabs(tabsData);
    }, [tabsData]);
    return tabsData && (
        <div className="tab-items">
            <TabItemsHeader tabs={tabs} selectItem={selectItem} />
            {selectedItem$}
        </div>
    ) || <p>No tabs data provided.</p>;
};

export default TabItems;
