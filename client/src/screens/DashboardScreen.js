import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import OwlSlider from 'components/modules/dashboard/OwlSlider';
import ContestItems from 'components/modules/dashboard/ContestItems';
import PrizesLine from 'components/modules/dashboard/PrizesLine';
import ContestCategories from 'components/modules/dashboard/ContestCategories';

import { requestContests } from 'reducers/actions/contests-actions';

function DashboardScreen(props) {
    const dispatch = useDispatch();
    const { contests } = useSelector(({ contests }) => contests);

    useEffect(() => {
        requestContests(dispatch);
    }, []);

    return (
        <div className="page page-dashboard">
            <ContestCategories />
            <OwlSlider items={contests} />
            <ContestItems items={contests} history={props.history} />
            <PrizesLine />
        </div>
    );
}

export default DashboardScreen;
