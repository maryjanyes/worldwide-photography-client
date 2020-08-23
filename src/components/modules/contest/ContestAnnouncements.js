import React from 'react';

import { useSelector } from 'react-redux';
import { getAnnouncements } from 'utils/data.util';

const ContestAnnouncements = ({ contestID }) => {
    const { allArticles } = useSelector(({ articles }) => articles);
    const newsByContest = getAnnouncements(allArticles, contestID);

    return (
        <div className="contest-announcements">
            {newsByContest.map(one => <div className="contest-announcement">
                <span>{one.title}</span>
            </div>)}
        </div>
    );
}

export default ContestAnnouncements;
