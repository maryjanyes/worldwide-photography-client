import React from "react";
import { useSelector } from "react-redux";

import GalleryPhoto from "components/modules/gallery/GalleryPhoto";

const GalleryScreen = () => {
  const { allPhotos, photoImpressions } = useSelector(({ photos }) => photos);
  return (
    <div className="page page-gallery">
      <div className="top-line"></div>
      <div className="gallery-pictures">
        {allPhotos.map((photo) => (
          <GalleryPhoto
            {...photo}
            adjustedWidth="32%"
            impressions={photoImpressions}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryScreen;
