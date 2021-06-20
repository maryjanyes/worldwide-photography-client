import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { pathToPhoto, getPhotoUrlFromPhotoObject } from "utils/data.util";
import { votePhoto } from "utils/action.utils";

import IconComponent from "components/common/CommonIcon";
import CommonModal from "components/common/CommonModal";
import useAuthors from "components/hooks/useAuthors.hook";
import ContestSubmittionInfo from "components/modules/contest/ContestSubmittionInfo";

const GalleryPhotoScreen = () => {
    const { photo_id } = useParams();
    const { photoSubmittions } = useSelector(({ photos, ui }) => ({ ...photos, ...ui }));
    const { author, setPhotoForHook } = useAuthors();
    const [photo, setPhoto] = useState(null);
    const [isPhotoFullScreenOpened, setIsPhotoFullScreenOpened] = useState(false);

    const photoPath = useMemo(() => {
        if (photoSubmittions?.length) {
            const photo = photoSubmittions.find((photo => photo.photo_submittion_id == photo_id));
            setPhoto(photo);
            setPhotoForHook(photo);
            return pathToPhoto(getPhotoUrlFromPhotoObject(photo));
        }
    }, [photoSubmittions?.length]);
    
    const closePhotoFullScreen = () => setIsPhotoFullScreenOpened(false);

    return (
        <div className="page page-gallery-photo">
            {/** <p className="page-title">{translations[getTranslationStr("pages.gallery_details_page.title", activeLanguage)]}</p> **/}
            <div className="gallery-photo__full-screen">
                <IconComponent source="fa-expand" onClick={() => setIsPhotoFullScreenOpened(true)} />
                {isPhotoFullScreenOpened && (
                    <CommonModal closeModal={closePhotoFullScreen}>
                        <div className="gallery-photo__preview-modal">
                            <img src={photoPath} className="site-image" />
                        </div>
                    </CommonModal>
                )}
                <img src={photoPath} alt={photo?.description} className="site-image" />
                <div className="gallery-photo__photo-info">
                    <ContestSubmittionInfo {...photo} author={author} />
                    <IconComponent
                        source="fa-thumbs-up"
                        onClick={() => votePhoto(photo.photo_submittion_id)}
                        description="Vote submittion"
                        containerStyle={{ margin: '10px 0' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default GalleryPhotoScreen;
