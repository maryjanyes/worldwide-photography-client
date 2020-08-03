import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import WithCarouselRef from 'components/common/wrappers/WithCarouselRef';

const ContestItem = ({ name, description, contest_id, started_at, exploreContest, avatar_id }) => {
    const { contestAvatars } = useSelector(({ contests }) => contests);

    const buildContestStatusLabel = () => {
        return started_at > Date.now() ? 
            <div className="contest-status coming">Starts soon</div> :
            <div className="contest-status active">Active</div>;
    };

    const contestAvatar = () => {
        const ava = contestAvatars.find(one => one.avatar_id === avatar_id);
        return ava || 'assets/images/pane2.jpg';
    };

    return (
        <div className="item contest-item" key={contest_id}>
            <h4 className="contest-item-card">
                <div
                    className="contest-item-card-header"
                    style={{
                        backgroundImage: `url(${contestAvatar()}`,
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

const ContestItems = ({ history, contestItems = null }) => {
    const { contests } = useSelector(({ contests }) => contests);
    const data = useMemo(() => contestItems || contests, [contests]);

    const exploreContest = contest_id => {
        history.push(`/contest/${contest_id}`);
    };

    const canShow = data.length > 0;

    return (
        <div className="contest-items">
            {canShow && (
                <WithCarouselRef speed={4000}>
                    {data
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
