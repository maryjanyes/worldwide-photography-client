import React, { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { ApiService } from 'services/api.service';

const ContestItem = ({ name, description, contest_id, started_at, exploreContest, avatar_id }) => {
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
                    <button onClick={() => exploreContest(contest_id)} className="btn btn-simple">Explore</button>
                </div>
            </h4>
        </div>
    );
};

const ContestItems = ({ history, items }) => {
    const [carouselRef, setRef] = useState(null);
    const exploreContest = contest_id => {
        history.push(`/contest/${contest_id}`);
    };
    const setCarouselRef = ref => setRef(ref);

    useEffect(() => {
        if (carouselRef) {
            carouselRef.play(5000, 1000);
        }
    }, [carouselRef]);

    return (
        <div className="contest-items">
            {items.length > 0 && <OwlCarousel
                className="contest-items-slider"
                loop
                nav
                margin={10}
                ref={ref => setCarouselRef(ref)}
            >
                {items && items.map(one => <ContestItem {...one} exploreContest={exploreContest} />)}
            </OwlCarousel>}
        </div>
    );
};

export default ContestItems;
