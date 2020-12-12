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
  getTranslationStr,
} from "utils/data.util";
import { inputStyle, submitContestModalStyle, containerStyle } from "./style";

import daysIconSource from '../../assets/icons/baseline_query_builder_black_18dp.png';
import insertPhotoIconSource from '../../assets/icons/baseline_insert_photo_black_18dp.png';
import baselineFaceIconSource from '../../assets/icons/baseline_face_black_18dp.png';
import baselineCurrencyIconSource from '../../assets/icons/baseline_local_offer_black_18dp.png';

function ContestScreen() {
  const [contestSubmittions, setContestSubmittions] = useState([]);
  const { contest_id } = useParams();
  const { contests, activeLanguage, translations } = useSelector(({ contests, ui }) => ({ ...contests, ...ui }));
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
          generalBlockTitle={translations[getTranslationStr('pages.contest_details.tabs.general_info', activeLanguage)]}
          resultsBlockTitle={translations[getTranslationStr('pages.contest_details.tabs.results_info', activeLanguage)]}
          newsBlockTitle={translations[getTranslationStr('pages.contest_details.tabs.news_info', activeLanguage)]}
        />
        <SocialSharing />
      </div>
    )) || <span>No contest selected.</span>
  );
}

function AnnouncementsComponent({ selectedContest, title }) {
  return (
    <div className="contest-news">
      <h2>{title}</h2>
      <ContestAnnouncements contestID={selectedContest.contest_id} />
    </div>
  );
}

function GeneralInfoComponent({ title, name, description }) {
  const { activeLanguage, translations } = useSelector(({ ui }) => ui);

  return (
    <div className="contest-info-container">
      <h2>{title}</h2>
      <div className="contest-info-container__items">
        <div className="contest-info-container__items-item">
          <span>{translations[getTranslationStr('pages.contest_details.tabs.general.name', activeLanguage)]}</span>
          <span>{name}</span>
        </div>
        <div className="contest-info-container__items-item">
          <span>{translations[getTranslationStr('pages.contest_details.tabs.general.description', activeLanguage)]}</span>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
}

function ResultsComponent({ selectedContest, title }) {
  const { name, is_ended, winner_id } = selectedContest;

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
      <h2>{title}</h2>
      {(is_ended && displayContestResults()) || (
        <p>Contest at progress.</p>
      )}
    </div>
  );
}

function ContestDetailsInfo({
  selectedContest,
  contestSubmittions,
  generalBlockTitle,
  resultsBlockTitle,
  newsBlockTitle,
}) {
  const { siteJudles, translations, activeLanguage } = useSelector(({ users, ui }) => ({ ...users, ...ui }));
  const daysToEntry = getTimeToContestEnd(selectedContest.ended_at);
  const tabsData = ContestsService.getContestDetailsTemplate(
    WithLanguageProps(GeneralInfoComponent, ['name', 'description']),
    WithLanguageProps(ResultsComponent, ['name', 'description']),
    AnnouncementsComponent,
    { selectedContest, generalBlockTitle, resultsBlockTitle, newsBlockTitle }
  );
  const contestJudle = getJudleByID(siteJudles, selectedContest.judle_id);

  return (
    <div className="contest-details-info">
      <div className="contest-details-info__card">
        <div className="contest-details-info__card-top">
          <div className="contest-details-info__card-top__body">
            <div className="contest-tabs">
              <TabItems tabsData={tabsData} keyName="name" activeItemID={0} />
            </div>
            <div className="link-to-other-contests">
              <Link to="/all-contests">{translations[getTranslationStr('common.other_contests', activeLanguage)]}</Link>
            </div>
          </div>
          <div className="contest-details-info__additions">
            <div className="contest-stroke-info">
              <div className="contest-stroke-info__item">
                <IconComponent
                  source={daysIconSource}
                  size={25}
                />
                <p>{daysToEntry} days left to enter contest</p>
              </div>
              <div className="contest-stroke-info__item">
                <IconComponent
                  source={insertPhotoIconSource}
                  size={25}
                />
                <p>{contestSubmittions.length?.toString()} photos entered</p>
              </div>
              <div className="contest-stroke-info__item">
                <IconComponent
                  source={baselineFaceIconSource}
                  size={25}
                />
                <p>
                  Contest judle <br />
                  <b>{concatNameParts(contestJudle)}</b>
                </p>
              </div>
              <div className="contest-stroke-info__item">
              <IconComponent
                  source={baselineCurrencyIconSource}
                  size={25}
                />
                <p>
                  {translations[getTranslationStr('pages.contest_details.tabs.general.enter_fee', activeLanguage)]} <br />
                  {selectedContest.enter_fee}$
                </p>
              </div>
              <SubmitPhotoArea
                contestID={selectedContest.contest_id}
                contestName={selectedContest.name}
              />
            </div>
          </div>
        </div>
        <div className="contest-details-bottom all-contest-entries">
          <h3 className="all-contest-entries__title">{translations[getTranslationStr('common.all_contest_entries', activeLanguage)]}</h3>
          <ContestSubmittions submittions={contestSubmittions} />
        </div>
      </div>
    </div>
  );
}

function SubmitPhotoArea({ contestID, contestName }) {
  const dispatch = useDispatch();
  const { uploadedImage, activeLanguage, translations, lastUploadedImage } = useSelector(({ contests, ui }) => ({ ...contests, ...ui }));
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
        {translations[getTranslationStr('common.apply_photo', activeLanguage)]}
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
              <div className="upload-input-container__next">
                <span>Choose photo</span>
                <UploadInput
                  onChangePhotoUrl={onChangePhotoUrl}
                  inputStyle={inputStyle}
                  containerStyle={containerStyle}
                  fileName={lastUploadedImage?.name}
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
