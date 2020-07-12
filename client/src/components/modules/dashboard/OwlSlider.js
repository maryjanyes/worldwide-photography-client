import React, { useState, useEffect } from 'react';

import { sortItems } from 'utils/items.util';

const OwlSliderItem = ({ title, description, images, isSelected = false }) => {
    const text = description || title;
    return (
        <div key={text} className={`${isSelected ? 'selected ' : ''} owl-slider-item`}>
            <button className="owl-slider-item-frame">
                <p className="owl-slider-item-text">{text}</p>
                <div className="owl-slider-images">
                    {(images || []).map(one => <img src={one.src} key={one.src} />) /* todo Do SEO */ }
                </div>
            </button>
        </div>
    );
};

const OwlControls = ({ change, active }) => {
    return (
        <div className="owl-controls">
            <button onClick={() => change(active - 1)} className="owl-control owl-control-prev"></button>
            <button onClick={() => change(active + 1)} className="owl-control owl-control-next"></button>
        </div>
    );
};

const OwlSlider = ({ items }) => {
    const [sliderItems, setItems] = useState(null);
    const [activeItem, setActiveItem] = useState(0);
    const sliderImages = [{
        src: 'assets/images/dc38547395a3908bd67642926a16ecc2.png'
    }, {
        src: 'assets/images/dc38547395a3908bd67642926a16ecc3.png'
    }, {
        src: 'assets/images/dc38547395a3908bd67642926a16ecc4.png' 
    }];
    const selectItem = index => {
        if (index > sliderImages.length - 1 || index < 0) {
            return;
        }
        setItems(
            (sliderItems || []).map((one, id) => {
               one.isSelected = (index === id);
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
                {sliderItems && sortItems(
                    sliderItems,
                    'created_at'
                ).map(one => <OwlSliderItem {...one} selected={one.isSelected} />)}
            </div>
        );
    };

    useEffect(() => {
        setItems(items.filter((one, id) => id <= 2).map((one, id) => {
            one.images = sliderImages;
            one.isSelected = id === 0;
            return one;
        }));
    }, [items]);

    return (
        <div className="owl-slider">
            {displayItems()}
            <OwlControls active={activeItem} change={selectItem} />
        </div>
    );
};

export default OwlSlider;
