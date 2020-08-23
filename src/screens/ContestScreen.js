import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useModal from "use-react-modal";
import { Link } from "react-router-dom";

import TabItems from "components/common/TabItems";
import SocialSharing from "components/common/SocialSharing";
import ContestAnnouncements from "components/modules/contest/ContestAnnouncements";
import AllContestPhotos from "components/modules/contest/AllContestPhotos";
import IconComponent from "components/common/IconComponent";
import UploadInput from "components/common/UploadInput";
import ModalComponent from "components/common/ModalComponent";
import ContestDetails from "components/modules/contest/ContestDetails";

import ApplyContestForm from "components/modules/apply-contest/ApplyContestForm";

import { ContestsService } from "services/contests.service";
import { getContestJudle } from "utils/data.util";
import { setUploadedImage } from "reducers/actions/contests.actions";

import { inputStyle, submitContestModalStyle } from "./style";

function ContestScreen() {
  const { contest_id } = useParams();
  const { contests } = useSelector(({ contests }) => contests);
  const selectedContest = useMemo(() =>
    contests.find((one) => one.contest_id == contest_id)
  );
  const contestAvatar = "";

  return (
    (selectedContest && (
      <div className="page page-contest-details">
        <ContestDetails selectedContest={selectedContest} />
        <ContestDetailsInfo
          selectedContest={{
            ...selectedContest,
            avatar: contestAvatar,
          }}
        />
        <SocialSharing />
      </div>
    )) || <span>No contest selected.</span>
  );
}

function AnnouncementsComponent(props) {
  return (
    <div className="contest-news" key="a">
      <h3>News about Contest</h3>
      <ContestAnnouncements contestID={props.contest_id} />
    </div>
  );
}

function GeneralInfoComponent({ selectedContest }) {
  return (
    <div className="contest-general-info" key="g">
      <h3>General info of Contest</h3>
      <div className="general-info-description">
        {selectedContest.description}
      </div>
    </div>
  );
}

function ResultsComponent({ winner }) {
  const showContestResults = () => {
    return (
      <div className="contest-results">
        <span>Winner of Contest {winner.name}.</span>
      </div>
    );
  };
  return (
    <div className="results-info-block" key="r">
      <h3>Results of Contest</h3>
      {(winner && showContestResults()) || "Contest at progress."}
    </div>
  );
}

function ContestDetailsInfo({ selectedContest }) {
  const {
    allSubmittions,
    contestJudles,
  } = useSelector(({ contests, photos }) => ({ ...contests, ...photos }));
  const timeToEntry = useMemo(() => selectedContest.started_at, []);
  const submittions = []; // getSubmittionsByContestID(allSubmittions, selectedContest.contest_id);
  const judle = getContestJudle(contestJudles, selectedContest.contest_id);
  const tabsData = ContestsService.getContestDetailsTemplate(
    GeneralInfoComponent,
    ResultsComponent,
    AnnouncementsComponent,
    selectedContest
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
              alt={selectedContest.name}
              className="contest-details-avatar"
            />
            <div className="contest-stroke-info">
              <div>
                <IconComponent />
                <p>{timeToEntry} time left to enter.</p>
              </div>
              <div>
                <IconComponent />
                <p>{submittions.length} photos entered.</p>
              </div>
              <div>
                <IconComponent />
                <p>Judle {judle && judle.name}.</p>
                <SubmitPhotoArea />
              </div>
            </div>
          </div>
        </div>
        <div className="contest-details info-all-contest-entries">
          <span className="all-entries-text">
            All contest entries of Contest on WorldwidePhotography.com
          </span>
          <AllContestPhotos contestID={selectedContest.contest_id} />
        </div>
      </div>
    </div>
  );
}

function SubmitPhotoArea() {
  const { uploadedImage } = useSelector(({ contests }) => contests);
  const dispatch = useDispatch();
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
              <div className="select-photo-area">
                <span>Choose photo to enter</span>
                <UploadInput
                  onChangePhotoUrl={onChangePhotoUrl}
                  inputStyle={inputStyle}
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
