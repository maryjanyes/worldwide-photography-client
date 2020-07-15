import React, { useRef, useEffect } from 'react';

import OwlCarousel from 'react-owl-carousel';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const WithCarouselRef = ({ children, containerClass = {}, speed, }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref) {
            ref.current.play(speed, 1000);
        }
    }, [ref]);

    return (
        <OwlCarousel
            className={containerClass}
            loop
            nav
            margin={10}
            ref={ref}
        >{children}</OwlCarousel>
    );
};

export default WithCarouselRef;
