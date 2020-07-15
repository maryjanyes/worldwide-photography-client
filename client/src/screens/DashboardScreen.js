import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import BannerSlider from 'components/modules/dashboard/BannerSlider';
import ContestItems from 'components/modules/dashboard/ContestItems';
import PrizesLine from 'components/modules/dashboard/PrizesLine';
import ContestCategories from 'components/modules/dashboard/ContestCategories';

import { requestContests } from 'reducers/actions/contests.actions';

function DashboardScreen(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        requestContests(dispatch);
    }, []);

    return (
        <div className="page page-dashboard">
            <ContestCategories />
            <BannerSlider />
            <ContestItems history={props.history} />
            <PrizesLine />
        </div>
    );
}

export default DashboardScreen;
