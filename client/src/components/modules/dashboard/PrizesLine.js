import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const PrizesLine = () => {
    const { prizes, contests } = useSelector(({ prizes, contests }) => ({
        ...prizes,
        ...contests,
    }));
    const getContest = ({ contest_id }) => {
        return contests.find(one => one.contest_id === contest_id);
    };
    return (
        <div className="prizes-line">
            {(prizes.length > 0 && contests.length > 0) && <OwlCarousel
                className="contest-items-slider"
                loop
                margin={0}
                nav
            >
                {prizes.map(prize => {
                    const contest = getContest(prize);
                    return (
                        <div className="prize-item item" key={prize.name}>
                            <p className="prize-name">
                                <span>{prize.name}</span>
                            </p>
                            <img src={prize.avatar || "/assets/images/camera1.png"} alt={prize.name} className="prize-image" />
                            <p className="prize-contest-name">
                                <span>Belong to contest</span>
                                <Link to={`/contest/${contest.contest_id}`}>`{contest ? contest.name : ''}`</Link>
                            </p>
                        </div>
                    )
                })}
            </OwlCarousel>}
        </div>
    );
};

export default PrizesLine;
