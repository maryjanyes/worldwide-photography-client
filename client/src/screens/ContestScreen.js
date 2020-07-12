import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TabItems from 'components/common/TabItems';
import SocialSharing from 'components/common/SocialSharing';

import { ApiService } from 'services/api.service';

function ContestScreen() {
    const { contest_id } = useParams();
    const { contests } = useSelector(({ contests }) => contests);
    const selectedContest = useMemo(() => contests.find(one => one.contest_id == contest_id));
    return selectedContest && (     
        <div className="page page-contest-details">
            <div className="contest-details-preview">
                <img
                    src={selectedContest.avatar_url || ApiService.defaultContestAvatar()}
                    alt={selectedContest.name}
                    className="contest-details-contest-avatar"
                />
                <p className="contest-details-preview-name">{selectedContest.name}</p>
                <p className="contest-details-preview-description">{selectedContest.description}</p>
            </div>
            <div className="contest-details-info">
                <div className="contest-details-info-card">
                    <div className="contest-details-info-top">
                        <div className="contest-details-info-body">
                            <div className="">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="">
                                <TabItems />
                            </div>
                            <div className="">
                                <SocialSharing />
                            </div>
                        </div>
                        <div className="contest-details-info-additions">
                            <p>Other info.</p>
                        </div>
                    </div>
                    <div className="contest-details-info-all-contest-entries">
                        <h3>All contest entries</h3>
                    </div>
                </div>
            </div>
        </div>
    ) || <p>No contest selected.</p>;
}

export default ContestScreen;