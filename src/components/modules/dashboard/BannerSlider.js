import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { sortItems } from "utils/items.util";

import dashboardSliderImages from "mocks/dashboard-slider-images";
import WithLanguageProps from "components/wrappers/WithLanguageProps";

const BannerSliderItem = WithLanguageProps(({ name, images = [], isSelected }) => {
    return (
      <div key={name} className={`${(isSelected && "selected ") || ""} owl-slider-item`}>
        <button className="owl-slider-item-frame">
          <p className="owl-slider-item-text">{name}</p>
          <div className="owl-slider-images">
            {images.map(({ src }, imageID) => (
              <img src={src} key={imageID} className="site-image" />
            ))}
          </div>
        </button>
      </div>
    );
  }, ['name', 'description']
);

const BannerSliderControls = ({ change, active }) => {
  return (
    <div className="owl-controls">
      <button
        onClick={() => change(active - 1)}
        className="owl-control owl-control-prev"
      ></button>
      <button
        onClick={() => change(active + 1)}
        className="owl-control owl-control-next"
      ></button>
    </div>
  );
};

const BannerSlider = () => {
  const { contests } = useSelector(({ contests }) => contests);
  const [sliderItems, setItems] = useState(null);
  const [activeItem, setActiveItem] = useState(0);
  const sliderImages = dashboardSliderImages;

  const selectItem = (itemID) => {
    if (itemID > sliderImages.length - 1 || itemID < 0) {
      return;
    }
    setItems(
      (sliderItems || []).map((item, id) => {
        item.isSelected = itemID === id;
        if (item.isSelected) {
          setActiveItem(itemID);
        }
        return item;
      })
    );
  };

  const displayItems = () => {
    return (
      <div className="owl-slider-items-container">
        {sliderItems &&
          sortItems(sliderItems, "created_at").map((one, slideID) => (
            <BannerSliderItem {...one} key={slideID} />
          ))}
      </div>
    );
  };

  useEffect(() => {
    setItems(
      contests
        .map((item, itemID) => {
          item.images = sliderImages;
          item.isSelected = itemID === 0;
          return item;
        })
    );
  }, [contests]);

  return contests.length > 0 && (
    <div className="owl-slider">
      {displayItems()}
      <BannerSliderControls active={activeItem} change={selectItem} />
    </div>
  ) || <React.Fragment/>;
};

export default BannerSlider;
