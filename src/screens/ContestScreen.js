import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
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
import { setUploadedImage, setContestAnnouncements } from "reducers/actions/contests.actions";
import { setContestsSubmittionsSuccess } from "reducers/actions/contests.actions";

import {
  getTimeToEnd,
  getJudleByID,
  getUserByID,
  concatNameParts,
  isDataValid,
  getTranslationStr,
  isTimePassed,
  convertContestCurrency,
} from "utils/data.util";
import { inputStyle, containerStyle } from "./style";

function ContestScreen() {
  const { contest_id } = useParams();
  const {
    contests,
    activeLanguage,
    translations,
    currencyCode,
    contestSubmittions,
    contestAnnouncements,
  } = useSelector(({ contests, ui, auth }) => ({ ...contests, ...ui, ...auth }));
  const selectedContest = useMemo(() => contests.find((c) => c.contest_id == contest_id));
  const dispatch = useDispatch();

  const requestSubmittions = async contestID => {
    const submittionsData = await contestsService.getSubmittionsForContest(contestID);

    if (isDataValid(submittionsData)) {
      dispatch(setContestsSubmittionsSuccess(submittionsData.data));
    }
  };

  const requestAnnouncements = async contestID => {
    const announcementsByContest = await contestsService.getContestAnnouncements(contestID);

    if (isDataValid(announcementsByContest)) {
      dispatch(setContestAnnouncements(announcementsByContest.data));
    }
  }

  useEffect(() => {
    const contestID = parseFloat(contest_id);
  
    requestSubmittions(contestID);
    requestAnnouncements(contestID);
  }, []);

  return (
    (selectedContest && (
      <div className="page page-contest-details">
        <ContestDetails {...selectedContest} />
        <ContestDetailsInfo
          currencyCode={currencyCode}
          selectedContest={selectedContest}
          contestSubmittions={contestSubmittions}
          refresh={requestSubmittions}
          generalBlockTitle={translations[getTranslationStr('pages.contest_details.tabs.general_info', activeLanguage)]}
          resultsBlockTitle={translations[getTranslationStr('pages.contest_details.tabs.results_info', activeLanguage)]}
          newsBlockTitle={translations[getTranslationStr('pages.contest_details.tabs.news_info', activeLanguage)]}
        />
        <SocialSharing fb={true} google={true} />
      </div>
    )) || <React.Fragment />
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

function ResultsComponent({ selectedContest, title, resultsNotStartedYet, resultsWinner }) {
  const { siteUsers } = useSelector(({ users }) => users);

  const { is_ended, winner_id } = selectedContest;

  const displayContestResults = () => {
    const winner = getUserByID(siteUsers, winner_id);
  
    return winner ? (
      <div className="contest-results">
        <span>{resultsWinner} <b>{winner.email}</b></span> <i class="fas fa-glass-cheers"></i>
      </div>
    ) : <React.Fragment />;
  };

  return (
    <div className="results-info">
      <h2>{title}</h2>
      {(is_ended && displayContestResults()) || (
        <p>{resultsNotStartedYet}</p>
      )}
    </div>
  );
}

function ContestDetailsInfo({
  selectedContest,
  contestSubmittions,
  refresh,
  generalBlockTitle,
  resultsBlockTitle,
  newsBlockTitle,
  currencyCode,
}) {
  const [enterEmount, setEnterAmount] = useState(0);

  const { siteJudles, translations, activeLanguage } = useSelector(({ users, ui }) => ({ ...users, ...ui }));
  const isContestStarted = isTimePassed(selectedContest.started_at)
  const daysToEnterContest = getTimeToEnd(selectedContest.ended_at);
  const _props = {
    selectedContest,
    generalBlockTitle,
    resultsBlockTitle,
    newsBlockTitle,
    resultsNotStartedYet: translations[getTranslationStr('contests.common.not_started_yet', activeLanguage)],
    resultsWinner: translations[getTranslationStr('contests.common.the_winner', activeLanguage)],
  };

  const tabsData = ContestsService.getContestDetailsTemplate(
    WithLanguageProps(GeneralInfoComponent, ['name', 'description']),
    WithLanguageProps(ResultsComponent, ['name', 'description']),
    AnnouncementsComponent,
    _props,
  );
  const contestJudle = getJudleByID(siteJudles, selectedContest.judle_id);

  useEffect(() => {
    convertContestCurrency(
      selectedContest.enter_fee,
      selectedContest.enter_fee_currency_type,
      currencyCode,
    ).then(amount => setEnterAmount(amount));
  }, []);

  return (
    <div className="contest-details-info">
      <div className="contest-details-info__card">
        <div className="contest-details-info__card-top">
          <div className="contest-details-info__card-top__body">
            <div className="contest-tabs">
              <TabItems tabsData={tabsData} keyName="name" activeItemID={0} />
            </div>
            <div className="link-to-other-contests">
              <Link to="/contests">{translations[getTranslationStr('common.other_contests', activeLanguage)]}</Link>
            </div>
          </div>
          <div className="contest-details-info__additions">
            <div className="contest-stroke-info">
              <div className="contest-stroke-info__item">
                <IconComponent
                  source="far fa-clock"
                  size={25}
                  containerStyle={{ marginTop: '5px' }}
                />
                {isContestStarted ? (
                  daysToEnterContest === 0 ?
                    <p>
                      {translations[getTranslationStr('common.contest_ended', activeLanguage)]}
                    </p> :
                    <p>
                      {translations[getTranslationStr('common.days_to_enter_contest', activeLanguage)]} <b>{daysToEnterContest}</b>
                    </p>
                ) : (
                  <p>
                    {translations[getTranslationStr('common.contest_not_started', activeLanguage)]}
                  </p>
                )}
              </div>
              <div className="contest-stroke-info__item">
                <IconComponent
                  source="far fa-file-image"
                  size={25}
                  containerStyle={{ marginTop: '5px' }}
                />
                <p>
                  {translations[getTranslationStr('common.photos_entered_placeholder', activeLanguage)] || 'common.photos_entered_placeholder'}
                  <b>{' ' + contestSubmittions.length?.toString()} {translations[getTranslationStr('common.photos_entered', activeLanguage)]}</b>
                </p>
              </div>
              {contestJudle && <div className="contest-stroke-info__item">
                <IconComponent
                  source="far fa-file-image"
                  size={25}
                  containerStyle={{ marginTop: '5px' }}
                />
                <p>
                  {translations[getTranslationStr('common.photo_judle_placeholder', activeLanguage)] || 'common.photo_judle_placeholder'}
                  <b>{concatNameParts(contestJudle)}</b>
                </p>
              </div>}
              {!(isContestStarted && daysToEnterContest === 0) && <div className="contest-stroke-info__item">
                <IconComponent
                  source="fas fa-money-bill-wave"
                  size={25}
                  containerStyle={{ marginTop: '5px' }}
                />
                <p>
                  {translations[getTranslationStr('pages.contest_details.tabs.general.enter_fee', activeLanguage)] + '\n'}
                  <b>{selectedContest.enter_fee}{enterEmount}</b>
                </p>
              </div>}
              <SubmitPhotoArea contest={{ ...selectedContest, isContestStarted, daysToEnterContest }} />
            </div>
          </div>
        </div>
        <div className="contest-details-info__card-bottom all-contest-entries">
          <h3 className="all-contest-entries__title">{translations[getTranslationStr('common.all_contest_entries', activeLanguage)]}</h3>
          <ContestSubmittions submittions={contestSubmittions} refreshSubmittions={refresh} />
        </div>
      </div>
    </div>
  );
}

function SubmitPhotoArea({ contest: { contest_id, name, isContestStarted, daysToEnterContest } }) {
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
      <button ref={ref} className="btn btn-submit-photo" onClick={openSubmittionModal} disabled={!isContestStarted || daysToEnterContest === 0}>
        {translations[getTranslationStr('common.apply_photo', activeLanguage)]}
      </button>
      {isOpen && (
        <Modal className="modal-submit-contest">
          <ModalComponent closeModal={closeSubmittionModal}>
            <ApplyContestForm
              isPhotoUploaded={!!uploadedImage}
              image={contestImage}
              contestID={contest_id}
              contestName={name}
              close={closeSubmittionModal}
            >
              <div className="upload-input-container__next">
                <span>{translations[getTranslationStr("common.widgets.choose_photo", activeLanguage)]}</span>
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
