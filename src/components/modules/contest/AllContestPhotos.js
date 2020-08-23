import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { mergeContestsWithPhotos } from 'utils/data.util';

import ContestPhoto from './ContestPhoto';

const AllContestPhotos = ({ contestID }) => {
    const { allSubmittions, allPhotos } = useSelector(({ contests, photos }) => ({ ...contests, ...photos }));
    const photosByContest = useMemo(() => mergeContestsWithPhotos(
        contestID,
        allSubmittions,
        allPhotos,
    ), [allSubmittions, allPhotos]);
    return (
        <div className="contest-photos">
            {photosByContest.map(one => <ContestPhoto {...one} />)}
        </div>
    );
};

export default AllContestPhotos;
