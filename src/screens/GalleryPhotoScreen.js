import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { pathToPhoto, getPhotoUrlFromPhotoObject } from "utils/data.util";
import useAuthors from "components/hooks/useAuthors.hook";
import ContestSubmittionInfo from "components/modules/contest/ContestSubmittionInfo";

const GalleryPhotoScreen = () => {
    const { photo_id } = useParams();
    const { photoSubmittions } = useSelector(({ photos }) => photos);
    const { author, setPhotoForHook } = useAuthors();
    const [photo, setPhoto ] = useState(null);

    const photoPath = useMemo(() => {
        if (photoSubmittions?.length) {
            const photo = photoSubmittions.find((photo => photo.photo_submittion_id == photo_id));
            setPhoto(photo);
            setPhotoForHook(photo);
            return pathToPhoto(getPhotoUrlFromPhotoObject(photo));
        }
    }, [photoSubmittions]);
    
    return (
        <div className="page page-gallery-photo">
            <p className="page-title">Gallery photo</p>
            <div className="gallery-photo__full-screen">
                <img src={photoPath} alt={photo?.description} className="site-image" />
                <div className="gallery-photo__photo-info">
                    <ContestSubmittionInfo {...photo} author={author} />
                </div>
            </div>
        </div>
    )
}

export default GalleryPhotoScreen;
