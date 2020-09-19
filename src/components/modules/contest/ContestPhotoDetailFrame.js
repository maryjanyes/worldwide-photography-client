import React from "react";

const ContestPhotoDetailFrame = ({ photoSrc, author }) => {
  return (
    <div className="photo-detail-popup">
      <img src={photoSrc} className="photo-detail-popup-image" />
      <div className="author-info">
        <span>About author</span>
        <p>Name {author.name}</p>
        <p>Location {author.location}</p>
      </div>
    </div>
  );
};

export default ContestPhotoDetailFrame;
