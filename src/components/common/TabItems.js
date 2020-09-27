import React, { useState, useEffect } from "react";

function TabItemsHeader({ tabs, selectItem, key = "name", ItemProto }) {
  return tabs.map((one) => (
    <button
      onClick={() => selectItem(one)}
      className={`btn btn-tab-item${
        (ItemProto && ItemProto.name === one.name && " active") || ""
      }`}
      key={one.name}
    >
      <span>{one[key]}</span>
    </button>
  ));
}

const TabItems = ({ tabsData, keyName, activeItemID }) => {
  const [tabs, setTabs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemProto, setSelectedItemProto] = useState(null);
  const selectItem = (one) => {
    setSelectedItem(<one.Comp {...one.props} />);
    setSelectedItemProto(one);
  };

  useEffect(() => {
    if (activeItemID !== undefined) {
      selectItem(tabsData.find((i, id) => id === activeItemID));
    }
  }, []);

  useEffect(() => {
    setTabs(tabsData);
  }, [tabsData]);

  return (
    (tabsData && (
      <React.Fragment>
        <div className="tab-items">
          <TabItemsHeader
            tabs={tabs}
            selectItem={selectItem}
            ItemProto={selectedItemProto}
          />
        </div>
        {selectedItem}
      </React.Fragment>
    )) || <p>No tabs data provided.</p>
  );
};

export default TabItems;
