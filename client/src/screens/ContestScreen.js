import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ContestScreen() {
    const { contest_id } = useParams();
    const { contests } = useSelector(({ contests }) => contests);
    const selectedContest = useMemo(() => contests.find(one => one.contest_id === contest_id));
    return (
        <div className="page page-contest-details">
            <h1>There where you can see details of selected contest</h1>
            {selectedContest && <div className="apply-contest-container">
                <ul>
                    <li>
                        <span>ID of event</span> <br />
                        <span>{contest_id}</span>
                    </li>
                    <li>
                        <span>Participant fee</span> <br />
                        <span>{selectedContest.participant_fee}</span>
                    </li>
                </ul>
            </div>}
        </div>
    );
}

export default ContestScreen;