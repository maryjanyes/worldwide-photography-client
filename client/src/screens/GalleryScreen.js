import React from "react";
import { useSelector } from 'react-redux';

import Photo from 'components/modules/gallery/Photo';

const GalleryScreen = () => {
    const { allPhotos } = useSelector(({ photo }) => photo);
    return (
        <div className="page page-judle-classes">
            <h1>All photos</h1>
            <div className="photos">
                <p>Waiting for the photos</p>
                {(allPhotos || []).map(one => <Photo />)}
            </div>
        </div>
    );
};

export default GalleryScreen;
