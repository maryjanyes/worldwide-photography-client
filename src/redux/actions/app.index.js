import ContestsService from "services/contests.service";
import PhotosService from "services/photos.service";

import { apiService } from "services/api.service";

import { setContests, setContestsPrizes } from "./contests.actions";
import { setTranslations } from "./ui.actions";
import { setPhotos } from "./photos.actions";

export const initAppData = (dispatch) => {
  ContestsService.getContets().then((contestsResponse) => {
    ContestsService.getContetsDetails().then((contestsSubmittionsData) => {
      const contests = contestsResponse.map((c) => {
        const relatedDetail = contestsSubmittionsData.find(
          (cs) => cs.contest_details_id === c.contest_details_id
        );
        c = { ...c, ...relatedDetail };
        return c;
      });
      dispatch(setContests(contests));
    });
  });
  ContestsService.getContestsPrizes().then((contestsPrizes) => {
    dispatch(setContestsPrizes(contestsPrizes));
  });
  PhotosService.getPhotos().then((photosData) => {
    dispatch(setPhotos(photosData));
  });
  apiService.getAppTranslations().then((translationsData) => {
    dispatch(
      setTranslations(
        translationsData.reduce((acc, tr) => {
          acc[`${tr.key}.${tr.lang}`] = tr.value;
          return acc;
        }, {})
      )
    );
  });
  const type = "[APP] INIT_DATA";
  return {
    type,
  };
};
