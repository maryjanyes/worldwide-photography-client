import React, { useRef, useEffect } from "react";

import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const WithCarouselRef = ({ children, containerClass = "", speed, hasLoop }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref) {
      ref.current.play(speed, 1000);
    }
  }, [ref]);

  return (
    <OwlCarousel className={containerClass} nav center={true} loop={hasLoop} margin={10} ref={ref} responsive={{ 0: {
      items: 1,
    }, 780: {
      items: 2,
    }, 1080: {
      items: 3,
    } }}>
      {children}
    </OwlCarousel>
  );
};

export default WithCarouselRef;
