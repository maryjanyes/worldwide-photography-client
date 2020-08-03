import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { mergeContestsWithPhotos } from 'utils/data.util';

import ContestPhoto from './ContestPhoto';

const ContestPhotos = ({ contestID }) => {
    const { photoSubmittions, allPhotos } = useSelector(({ contests, photos }) => ({ ...contests, ...photos }));
    const photosByContest = useMemo(() => mergeContestsWithPhotos(
        contestID,
        photoSubmittions,
        allPhotos,
    ), [photoSubmittions, allPhotos]);
    return (
        <div className="contest-photos">
            {photosByContest.map(one => <ContestPhoto {...one} />)}
        </div>
    );
};

export default ContestPhotos;
