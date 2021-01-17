import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { pathToPhoto, getPhotoUrlFromPhotoObject } from "utils/data.util";

import SubmittionInfo from 'components/modules/contest/ContestSubmittionInfo';

const GalleryPhotoScreen = () => {
    const { photo_id } = useParams();
    const { allPhotos, contestSubmittions } = useSelector(({ photos, contests }) => ({ ...photos, ...contests }));
    const [photo, setPhoto] = useState(null)

    const photoPath = useMemo(() => {
        if (allPhotos && allPhotos.length > 0) {
            const photo = allPhotos.find((photo => photo.photo_submittion_id == photo_id));
            const submittion = contestSubmittions.find((sub => sub.contests_submittion_id == photo_id))
            setPhoto({ ...photo, ...submittion});
            return pathToPhoto(getPhotoUrlFromPhotoObject(photo));
        }
    }, [allPhotos.length, contestSubmittions.length]);

    return (
        <div className="page page-gallery-photo">
            <p className="page-title">Gallery photo</p>
            <div className="gallery-photo__full-screen">
                <img src={photoPath} alt={photo?.description} className="site-image" />
                {(photo?.author && photo?.votes) && <div className="gallery-photo__photo-author">
                    <SubmittionInfo author={photo?.author_id} votes={photo?.votes} />
                </div>}
            </div>
        </div>
    )
}

export default GalleryPhotoScreen;
