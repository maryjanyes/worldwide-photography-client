import React from "react";
import { useSelector } from "react-redux";

import GalleryPhoto from "components/modules/gallery/GalleryPhoto";

const GalleryScreen = () => {
  const { allPhotos, photoImpressions } = useSelector(({ photos }) => photos);

  const canDisplayPhotos = allPhotos.length > 0;

  return (
    <div className="page page-gallery">
      <div className="top-line"></div>
      {(canDisplayPhotos && (
        <div className="gallery-pictures">
          {allPhotos.map((photo) => (
            <GalleryPhoto
              {...photo}
              adjustedWidth="32%"
              impressions={photoImpressions}
            />
          ))}
        </div>
      )) ||
        "No available photos."}
    </div>
  );
};

export default GalleryScreen;
