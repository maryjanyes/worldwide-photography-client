import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import useModal from "use-react-modal";

import ContestAnnouncements from "components/modules/contest/ContestAnnouncements";
import ContestSubmittions from "components/modules/contest/ContestSubmittions";
import ContestDetails from "components/modules/contest/ContestDetails";
import ApplyContestForm from "components/modules/apply-contest/ApplyContestForm";
import IconComponent from "components/common/CommonIcon";
import UploadInput from "components/common/CommonUploadInput";
import ModalComponent from "components/common/CommonModal";
import TabItems from "components/common/TabItems";
import SocialSharing from "components/common/SocialSharing";
import WithLanguageProps from "components/wrappers/WithLanguageProps";

import contestsService, { ContestsService } from "services/contests.service";
import { setUploadedImage } from "reducers/actions/contests.actions";
import {
  getTimeToContestEnd,
  getJudleByID,
  getUserByID,
  concatNameParts,
  isDataValid,
} from "utils/data.util";

import { inputStyle, submitContestModalStyle, containerStyle } from "./style";

import daysIconSource from '../../assets/icons/baseline_query_builder_black_18dp.png';
import insertPhotoIconSource from '../../assets/icons/baseline_insert_photo_black_18dp.png';
import baselineFaceIconSource from '../../assets/icons/baseline_face_black_18dp.png';

function ContestScreen() {
  const [contestSubmittions, setContestSubmittions] = useState([]);
  const { contest_id } = useParams();
  const { contests } = useSelector(({ contests }) => contests);
  const selectedContest = useMemo(() => contests.find((c) => c.contest_id == contest_id));
  const requestSubmittions = async () => {
    const submittionsData = await contestsService.getSubmittionsForContest(
      contest_id
    );
    if (isDataValid(submittionsData)) {
      setContestSubmittions(submittionsData.data)
    }
  };

  useEffect(() => {
    requestSubmittions();
  }, []);

  return (
    (selectedContest && (
      <div className="page page-contest-details">
        <ContestDetails {...selectedContest} />
        <ContestDetailsInfo
          selectedContest={selectedContest}
          contestSubmittions={contestSubmittions}
        />
        <SocialSharing />
      </div>
    )) || <span>No contest selected.</span>
  );
}

function AnnouncementsComponent(props) {
  return (
    <div className="contest-news">
      <h2>Contest recent news</h2>
      <ContestAnnouncements contestID={props.contest_id} />
    </div>
  );
}

function GeneralInfoComponent({ description, name, enter_fee }) {
  return (
    <div className="contest-info-container">
      <h2>General info of Contest</h2>
      <div className="contest-info-details-container">
        <div className="contest-details-section">
          <span>Name</span>
          <span>{name}</span>
        </div>
        <div className="contest-details-section">
          <span>Description</span>
          <span>{description}</span>
        </div>
        <div className="contest-details-section">
          <span>Price to enter the contest</span>
          <span>{enter_fee}$</span>
        </div>
      </div>
    </div>
  );
}

function ResultsComponent({ name, is_ended, winner_id }) {
  const displayContestResults = () => {
    const winner = getUserByID(winner_id);
    return (
      <div className="contest-results">
        <span>
          Congrats the winner of Contest {name} is {winner?.name}.
        </span>
      </div>
    );
  };
  return (
    <div className="results-info">
      <h2>Results of Contest</h2>
      {(is_ended && displayContestResults()) || (
        <p>Contest at progress.</p>
      )}
    </div>
  );
}

function ContestDetailsInfo({ selectedContest, contestSubmittions }) {
  const { siteJudles } = useSelector(({ users }) => users);
  const daysToEntry = getTimeToContestEnd(selectedContest.ended_at);
  const tabsData = ContestsService.getContestDetailsTemplate(
    WithLanguageProps(GeneralInfoComponent, ['name', 'description']),
    WithLanguageProps(ResultsComponent, ['name', 'description']),
    AnnouncementsComponent,
    selectedContest
  );
  const contestJudle = getJudleByID(siteJudles, selectedContest.judle_id);

  return (
    <div className="contest-details-info">
      <div className="contest-details-info-card">
        <div className="contest-details-info-top">
          <div className="contest-details-info-top-body">
            <div className="contest-tabs">
              <TabItems tabsData={tabsData} keyName="name" activeItemID={0} />
            </div>
            <div className="link-to-other-contests">
              <Link to="/all-contests">Other opened contests</Link>
            </div>
          </div>
          <div className="contest-details-info-additions">
            <div className="contest-stroke-info">
              <div className="contest-stroke-info-piece">
                <IconComponent
                  source={daysIconSource}
                  size={25}
                />
                <p>{daysToEntry} days left to enter contest</p>
              </div>
              <div className="contest-stroke-info-piece">
                <IconComponent
                  source={insertPhotoIconSource}
                  size={25}
                />
                <p>{contestSubmittions.length?.toString()} photos entered</p>
              </div>
              <div className="contest-stroke-info-piece">
                <IconComponent
                  source={baselineFaceIconSource}
                  size={25}
                />
                <p>
                  {'Contest judle \n'}
                  <b>{concatNameParts(contestJudle)}</b>
                </p>
              </div>
              <SubmitPhotoArea
                contestID={selectedContest.contest_id}
                contestName={selectedContest.name}
              />
            </div>
          </div>
        </div>
        <div className="contest-details-bottom info-all-contest-entries">
          <h2 className="all-entries-text">
            All contest entries of Contest on WorldwidePhotography.com
          </h2>
          <ContestSubmittions submittions={contestSubmittions} />
        </div>
      </div>
    </div>
  );
}

function SubmitPhotoArea({ contestID, contestName }) {
  const dispatch = useDispatch();
  const { uploadedImage } = useSelector(({ contests }) => contests);
  const { ref, isOpen, openModal, closeModal, Modal } = useModal();
  const [contestImage, setContestImage] = useState(null);

  const onChangePhotoUrl = ({ target }) => {
    const file = target.files[0];
    dispatch(setUploadedImage(file));
    setContestImage(file);
  };

  const openSubmittionModal = () => {
    location.href = location.href + '#submitPhoto';
    openModal();
  };

  const closeSubmittionModal = () => {
    location.href = location.href.replace('#submitPhoto', '');
    closeModal();
  }

  return (
    <React.Fragment>
      <button ref={ref} className="btn btn-submit-photo" onClick={openSubmittionModal}>
        Apply photo
      </button>
      {isOpen && (
        <Modal className="submit-contest-modal">
          <ModalComponent
            style={submitContestModalStyle}
            closeModal={closeSubmittionModal}
          >
            <ApplyContestForm
              isPhotoUploaded={!!uploadedImage}
              image={contestImage}
              contestID={contestID}
              contestName={contestName}
              close={closeSubmittionModal}
            >
              <div className="submit-photo-container">
                <span>Choose photo</span>
                <UploadInput
                  onChangePhotoUrl={onChangePhotoUrl}
                  inputStyle={inputStyle}
                  containerStyle={containerStyle}
                />
              </div>
            </ApplyContestForm>
          </ModalComponent>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default ContestScreen;
