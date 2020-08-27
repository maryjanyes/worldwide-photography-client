import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import useModal from "use-react-modal";

import ContestAnnouncements from "components/modules/contest/ContestAnnouncements";
import ContestSubmittions from "components/modules/contest/ContestSubmittions";
import ContestDetails from "components/modules/contest/ContestDetails";
import ApplyContestForm from "components/modules/apply-contest/ApplyContestForm";
import IconComponent from "components/common/IconComponent";
import UploadInput from "components/common/UploadInput";
import ModalComponent from "components/common/ModalComponent";
import TabItems from "components/common/TabItems";
import SocialSharing from "components/common/SocialSharing";
import WithLanguageProps from "components/common/wrappers/WithLanguageProps";

import contestsService, { ContestsService } from "services/contests.service";
import { setUploadedImage } from "reducers/actions/contests.actions";
import { getTimeToContestEnd } from "utils/data.util";

import { inputStyle, submitContestModalStyle, containerStyle } from "./style";

function ContestScreen() {
  const [contestSubmittions, setContestSubmittions] = useState([]);
  const { contest_id } = useParams();
  const { contests } = useSelector(({ contests }) => contests);
  const selectedContest = useMemo(() =>
    contests.find((c) => c.contest_id == contest_id)
  );
  const requestSubmittions = async () => {
    const submittionsData = await contestsService.getSubmittionsForContest(
      contest_id
    );
    setContestSubmittions(submittionsData);
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

function GeneralInfoComponent({ description, name }) {
  return (
    <div className="contest-info">
      <h2>General info of Contest</h2>
      <div className="contest-info-container">
        <div className="contest-info-block">
          <span>Name</span>
          <span>{name}</span>
        </div>
        <div className="contest-info-block">
          <span>Description</span>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
}

function ResultsComponent({ winner_id, name }) {
  const showContestResults = () => {
    return (
      <div className="contest-results">
        <span>
          Winner of Contest {name} {winner.name}.
        </span>
      </div>
    );
  };
  return (
    <div className="results-info">
      <h2>Results of Contest '{name}'</h2>
      {(winner_id !== null && showContestResults()) || (
        <p>Contest at progress.</p>
      )}
    </div>
  );
}

function ContestDetailsInfo({ selectedContest, contestSubmittions }) {
  const { contestJudles } = useSelector(({ contests }) => contests);
  // todo
  const daysToEntry = getTimeToContestEnd(
    new Date(Date.now()).getDate(),
    selectedContest.ended_at
  ).getDate();
  const tabsData = ContestsService.getContestDetailsTemplate(
    WithLanguageProps(GeneralInfoComponent),
    WithLanguageProps(ResultsComponent),
    AnnouncementsComponent,
    selectedContest
  );
  const contestJudle = contestJudles.find(
    (j) => j.judle_id === selectedContest.judle_id
  );

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
              alt={selectedContest.en_name}
              className="contest-details-avatar"
            />
            <div className="contest-stroke-info">
              <div>
                <IconComponent />
                <p>{daysToEntry} days left to enter contest.</p>
              </div>
              <div>
                <IconComponent />
                <p>{contestSubmittions.length} photos entered.</p>
              </div>
              <div>
                <IconComponent />
                <p>Judle {contestJudle?.judle_id}.</p>
                <SubmitPhotoArea />
              </div>
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

function SubmitPhotoArea() {
  const dispatch = useDispatch();
  const { uploadedImage } = useSelector(({ contests }) => contests);
  const { ref, isOpen, openModal, closeModal, Modal } = useModal();
  const [contestImage, setContestImage] = useState(null);

  const onChangePhotoUrl = ({ target }) => {
    const file = target.files[0];
    dispatch(setUploadedImage(file));
    setContestImage(file);
  };

  return (
    <React.Fragment>
      <button ref={ref} className="btn btn-submit-photo" onClick={openModal}>
        Apply photo
      </button>
      {isOpen && (
        <Modal className="submit-contest-modal">
          <ModalComponent
            style={submitContestModalStyle}
            closeModal={closeModal}
          >
            <ApplyContestForm
              isPhotoUploaded={!!uploadedImage}
              image={contestImage}
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
