import React from 'react';
import { useSelector } from 'react-redux';

import GalleryPhoto from 'components/modules/gallery/GalleryPhoto';

const allPhotosHardcoded = [{
    link_to_file: 'https://sociumin.com/img.php?i=https://sun9-26.userapi.com/impf/c824700/v824700099/8db74/Vt5_X3RMv9I.jpg?size=400x0&quality=90&sign=818d6e7ddeddee3011d4ab7593fc1812&c_uniq_tag=arYhw6skv792WvqSiZd5TE3CkUgCGuMOxSee3NPh3mM&ava=1',
}, {
    link_to_file: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lotte_World_Tower_near_Cheongdam_Bridge.jpg',
}, {
    link_to_file: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Lotte_World_Tower_%282%29.jpg/2560px-Lotte_World_Tower_%282%29.jpg',
}, {
    link_to_file: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Lotte_World_Tower_%282%29.jpg/2560px-Lotte_World_Tower_%282%29.jpg',
}, {
    link_to_file: 'https://sociumin.com/img.php?i=https://sun9-26.userapi.com/impf/c824700/v824700099/8db74/Vt5_X3RMv9I.jpg?size=400x0&quality=90&sign=818d6e7ddeddee3011d4ab7593fc1812&c_uniq_tag=arYhw6skv792WvqSiZd5TE3CkUgCGuMOxSee3NPh3mM&ava=1',
}];

const GalleryScreen = () => {
    const { allPhotos = allPhotosHardcoded, photoImpressions } = useSelector(({ photos }) => photos);
    return (
        <div className="page page-gallery">
            <div className="top-line"></div>
            <div className="gallery-pictures">
                {allPhotos.map(photo => <GalleryPhoto {...photo} adjustedWidth="32%" impressions={photoImpressions} />)}
            </div>
        </div>
    );
};

export default GalleryScreen;
