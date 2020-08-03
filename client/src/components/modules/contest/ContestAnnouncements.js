import React from 'react';

import { useSelector } from 'react-redux';
import { getAnnouncements } from 'utils/data.util';

const ContestAnnouncements = ({ contestID }) => {
    const { allArticles } = useSelector(({ articles }) => articles);
    const newsByContest = getAnnouncements(contestID, allArticles);
    return (
        <div className="contest-announcements">
            {newsByContest.map((one, id) => <div className={id === 0 ? '' : 'contest-announcement'}>
                <span>{one.title}</span>
            </div>)}
        </div>
    );
}

export default ContestAnnouncements;
