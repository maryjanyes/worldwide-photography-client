import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { sortItems } from "utils/items.util";

const BannerSliderItem = ({ name, images = [], isSelected = false }) => {
  return (
    <div
      key={name}
      className={`${isSelected ? "selected " : ""} owl-slider-item`}
    >
      <button className="owl-slider-item-frame">
        <p className="owl-slider-item-text">{name}</p>
        <div className="owl-slider-images">
          {images.map(({ src }) => (
            <img src={src} key={src} />
          ))}
        </div>
      </button>
    </div>
  );
};

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
  const sliderImages = [
    {
      src: "assets/images/dc38547395a3908bd67642926a16ecc2.png",
    },
    {
      src: "assets/images/dc38547395a3908bd67642926a16ecc3.png",
    },
    {
      src: "assets/images/dc38547395a3908bd67642926a16ecc4.png",
    },
  ];
  const selectItem = (index) => {
    if (index > sliderImages.length - 1 || index < 0) {
      return;
    }
    setItems(
      (sliderItems || []).map((one, id) => {
        one.isSelected = index === id;
        if (one.isSelected) {
          setActiveItem(id);
        }
        return one;
      })
    );
  };
  const displayItems = () => {
    return (
      <div className="owl-slider-items-container">
        {sliderItems &&
          sortItems(sliderItems, "created_at").map((one, slideID) => (
            <BannerSliderItem
              {...one}
              selected={one.isSelected}
              key={slideID}
            />
          ))}
      </div>
    );
  };

  useEffect(() => {
    setItems(
      contests
        .filter((one, id) => id <= 2)
        .map((one, id) => {
          one.images = sliderImages;
          one.isSelected = id === 0;
          return one;
        })
    );
  }, [contests]);

  return (
    <div className="owl-slider">
      {displayItems()}
      <BannerSliderControls active={activeItem} change={selectItem} />
    </div>
  );
};

export default BannerSlider;
