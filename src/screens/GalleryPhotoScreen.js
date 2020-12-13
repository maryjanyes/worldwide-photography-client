import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { pathToPhoto, getPhotoUrlFromPhotoObject } from "utils/data.util";

const GalleryPhotoScreen = () => {
    const { photo_id } = useParams();
    const { allPhotos } = useSelector(({ photos }) => photos);
    const [photo, setPhoto] = useState(null)

    const photoPath = useMemo(() => {
        if (allPhotos && allPhotos.length > 0) {
            const photo = allPhotos.find((photo => photo.photo_submittion_id == photo_id));
            setPhoto(photo);
            return pathToPhoto(getPhotoUrlFromPhotoObject(photo));
        }
        return null;
    }, [allPhotos.length]);

    return (
        <div className="page page-gallery-photo">
            <p className="page-title">Gallery photo</p>
            <div className="gallery-photo__full-screen">
                <img src={photoPath} alt={photo?.description} />
            </div>
        </div>
    )
}

export default GalleryPhotoScreen;
