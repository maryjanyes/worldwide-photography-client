import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ContestItems from 'components/modules/dashboard/ContestItems';

const ContestCategoryScreen = ({ history }) => {
    const { category_id } = useParams();
    const { contests } = useSelector(({ contests }) => contests);
    const contestsByCategory = useMemo(() => contests.filter(c => c.category_id == category_id), []);
    const canShow = contestsByCategory.length > 0;

    return (
        <div className="page page-contest-category">
            <h1>All items in category {category_id}</h1>
            {canShow && <ContestItems contestItems={contestsByCategory} history={history} />}
        </div>
    );
};

export default ContestCategoryScreen;
