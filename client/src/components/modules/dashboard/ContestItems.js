import React from 'react';
import { useSelector } from 'react-redux';

import { ApiService } from 'services/api.service';

import WithCarouselRef from 'components/common/wrappers/WithCarouselRef';

const ContestItem = ({ name, description, contest_id, started_at, exploreContest, avatar_id }) => {
    const buildContestStatusLabel = () => {
        return started_at > Date.now() ? 
            <div className="contest-status coming">Starts soon</div> :
            <div className="contest-status active">Active</div>;
    };

    const contestAvatar = () => [].find(one => one.avatar_id === avatar_id);

    return (
        <div className="item contest-item" key={contest_id}>
            <h4 className="contest-item-card">
                <div
                    className="contest-item-card-header"
                    style={{
                        backgroundImage: (
                            contestAvatar() ?
                                contestAvatar :
                                `url(${ApiService.defaultContestAvatar()})`
                        ),
                    }}
                >{buildContestStatusLabel()}</div>
                <div className="contest-item-card-body">
                    <p className="contest-name">{name}</p>
                    <p className="contest-description">{description}</p>
                    <button onClick={() => exploreContest(contest_id)} className="btn btn-simple btn-explore-contest">Explore</button>
                </div>
            </h4>
        </div>
    );
};

const ContestItems = ({ history }) => {
    const { contests } = useSelector(({ contests }) => contests);

    const exploreContest = contest_id => {
        history.push(`/contest/${contest_id}`);
    };

    const canShow = contests.length > 0;

    return (
        <div className="contest-items">
            {canShow && (
                <WithCarouselRef speed={4000}>
                    {contests
                        .map(one =>
                            <ContestItem {...one} exploreContest={exploreContest} />
                        )
                    }
                </WithCarouselRef>  
            )}
        </div>
    );
};

export default ContestItems;
