import React from "react";
import { useSelector } from "react-redux";

import GalleryPhoto from "components/modules/gallery/GalleryPhoto";

import { getTranslationStr } from 'utils/data.util';

const GalleryScreen = () => {
  const { allPhotos, translations, activeLanguage } = useSelector(({ photos, ui }) => ({ ...photos, ...ui }));

  return (
    <div className="page page-gallery">
      <div className="top-line"></div>
      <span className="page-title">{translations[getTranslationStr('pages.gallery_page.title', activeLanguage)]}</span>
      {(allPhotos.length > 0 && (
        <div className="gallery-pictures">
          {allPhotos.map(photo => (
            <GalleryPhoto
              {...photo}
              adjustedWidth="31.5%"
              key={photo.photo_id}
            />
          ))}
        </div>
      )) || <p className="no-section-content">{translations[getTranslationStr('pages.common.no_items', activeLanguage)]}</p>}
    </div>
  );
};

export default GalleryScreen;
