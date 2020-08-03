import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useModal from 'use-react-modal';
import { Link } from 'react-router-dom';

import TabItems from 'components/common/TabItems';
import SocialSharing from 'components/common/SocialSharing';
import ContestAnnouncements from 'components/modules/contest/ContestAnnouncements';
import ContestPhotos from 'components/modules/contest/ContestPhotos';
import IconComponent from 'components/common/IconComponent';
import UploadInput from 'components/common/UploadInput';
import ModalComponent from 'components/common/ModalComponent';

import ApplyContestForm from 'components/modules/apply-contest/ApplyContestForm';

import { ApiService } from 'services/api.service';
import { getContestJudle } from 'utils/data.util';
import { updateLastPhotoForSubmit } from 'reducers/actions/contests.actions';

function ContestScreen() {
    const { contest_id } = useParams();
    const { contests, contestAvatars } = useSelector(({ contests }) => contests);

    const selectedContest = useMemo(() => contests.find(one => one.contest_id == contest_id));

    const contestAvatar = () => {
        contestAvatars.find(one => one.avatar_id === selectedContest.avatar_id) || 'assets/images/pane2.jpg';
    };

    return selectedContest && (     
        <div className="page page-contest-details">
            <ContestDetails selectedContest={selectedContest} />
            <ContestDetailsInfo selectedContest={{
                ...selectedContest,
                avatar: contestAvatar()
            }} />
            <SocialSharing />
        </div>
    ) || <span>No contest selected.</span>;
}

function AnnouncementsComp(props) {
    return (
        <div className="contest-news">
            <h3>News about Contest</h3>
            <ContestAnnouncements contestID={props.contest_id} />
        </div>
    );
}

function GeneralInfoComp({ selectedContest }) {
    return (
        <div className="contest-general-info">
            <h3>General info of Contest</h3>
            <div className="general-info-description">
                {selectedContest.description}
            </div>
        </div>
    );
}

function ResultsComp({ winner }) {
    const showContestResults = () => {
        return (
            <div className="contest-results">
                <span>Winner of Contest {winner.name}.</span>
            </div>
        );
    }
    return (
        <div className="results-info-block">
            <h3>Contest results of Contest</h3>
            {winner && showContestResults() || 'Contest at progress.'}
        </div>
    );
}

function ContestDetails({ selectedContest }) {
    return (
        <div className="contest-details-preview">
            <img
                src={selectedContest.avatar || ApiService.defaultContestAvatar()}
                alt={selectedContest.name}
                className="contest-details-avatar"
            />
            <div className="contest-info-block">
                <p className="contest-details-preview-name">{selectedContest.name}</p>
                <p className="contest-details-preview-description">{selectedContest.description}</p>
            </div>
        </div>
    );
}

function ContestDetailsInfo({ selectedContest }) {
    const { photoSubmittions, judles } = useSelector(({ contests, photos }) => ({ ...contests, ...photos }));
    const tabsData = [{
        name: 'General info',
        Comp: GeneralInfoComp,
        props: {
            selectedContest,
        },
    }, {
        name: 'Results',
        Comp: ResultsComp,
        props: {
            selectedContest,
        },
    }, {
        name: 'News',
        Comp: AnnouncementsComp,
    }];
    const timeToEntry = useMemo(() => selectedContest.started_at, []);
    const contestSubmittions = photoSubmittions.filter(s => s.contest_id == selectedContest.contest_id);
    const contestJudle = getContestJudle(selectedContest.contest_id, judles);

    return (
        <div className="contest-details-info">
                <div className="contest-details-info-card">
                    <div className="contest-details-info-top">
                        <div className="contest-details-info-body">
                            <div className="contest-tabs">
                                <TabItems tabsData={tabsData} keyName="name" activeItemID={0} />
                            </div>
                            <div className="other-opended-contests">
                                <Link to="/contests">Other opened contests</Link>
                            </div>
                        </div>
                        <div className="contest-details-info-additions">
                            <img
                                src={selectedContest.avatar}
                                alt={selectedContest.name}
                                className="contest-details-avatar"
                            />
                            <div className="contest-stroke-info">
                                <div>
                                    <IconComponent />
                                    <p>{timeToEntry} left to enter.</p>
                                </div>
                                <div>
                                    <IconComponent />
                                    <p>{contestSubmittions.length} photos entered.</p>
                                </div>
                                <div>
                                    <IconComponent />
                                    <p>Judle {contestJudle && contestJudle.name}.</p>
                                    <SubmitPhotoArea />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contest-details info-all-contest-entries">
                        <span>All contest entries of Contest on WorldwidePhotography.com</span>
                        <ContestPhotos />
                    </div>
                </div>
        </div>
    );
}

function SubmitPhotoArea() {
    const dispatch = useDispatch();
    const [photoUrl, setPhotoUrl] = useState(null);
    const { ref, isOpen, openModal, closeModal, Modal } = useModal();

    const onChangePhotoUrl = ({ target }) => {
        setPhotoUrl(target.value);
        dispatch(updateLastPhotoForSubmit(photoUrl));
    };

    return (
        <React.Fragment>
            <button ref={ref} className="btn btn-submit-photo" onClick={openModal}>Submit photo</button>
            {isOpen && (
                <Modal className="submit-contest-modal">
                    <ModalComponent style={{
                        padding: 20,
                        'background-color': '#000000',
                    }} closeModal={closeModal}>
                        <ApplyContestForm>
                            <UploadInput onChangePhotoUrl={onChangePhotoUrl} />
                        </ApplyContestForm>
                    </ModalComponent>
                </Modal>
            )}
        </React.Fragment>
    );
}

export default ContestScreen;