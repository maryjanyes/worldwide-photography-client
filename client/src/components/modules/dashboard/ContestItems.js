import React from "react";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ContestItem = ({ name, contest_id, started_at, exploreContest, avatar_id }) => {
    const buildContestStatusLabel = () => {
        const now = Date.now()
        return started_at > now ? 
            <div className="contest-status-label contest-status-coming">Starts soon</div> :
            <div className="contest-status-label contest-status-active">Active</div>;
    };
    const contestAvatar = () => [].find(one => one.avatar_id === avatar_id);
    return (
        <div className="item contest-item" key={contest_id}>
            <h4 className="contest-item-card">
                <div
                    className="contest-item-card-header"
                    style={
                        contestAvatar() ?
                         { backgroundImage: contestAvatar } :
                         { backgroundImage: "url(assets/images/pane1.png)" }
                    }
                >
                    <p className="contest-name">
                        <span className="original">{name}</span>
                    </p>
                    {buildContestStatusLabel()}
                </div>
                <div className="contest-item-card-body">
                    <button onClick={() => exploreContest(contest_id)} className="btn btn-simple">Explore</button>
                </div>
            </h4>
        </div>
    );
};

const ContestItems = ({ history, items }) => {
    const exploreContest = contest_id => {
        history.push(`/contest/${contest_id}`);
    };
    return (
        <div className="contest-items">
            {items.length > 0 && <OwlCarousel
                className="contest-items-slider"
                loop
                margin={0}
                nav
            >
                {items && items.map(one => <ContestItem {...one} exploreContest={exploreContest} />)}
            </OwlCarousel>}
        </div>
    );
};

export default ContestItems;
