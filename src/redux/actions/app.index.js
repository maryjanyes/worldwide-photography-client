import ContestsService from "services/contests.service";
import PhotosService from "services/photos.service";
import UsersService from "services/users.service";
import ArticlesService from "services/articles.service";
import { apiService } from "services/api.service";

import {
  setContests,
  setContestsPrizesSuccess,
  setContestsCategoriesSuccess,
} from "./contests.actions";
import { setTranslations, setAppLanguage } from "./ui.actions";
import { setPhotosSuccess } from "./photos.actions";
import { setJudlesSuccess } from "./users.actions";
import { checkExistedAccountAndSignIn } from "./auth.actions";
import { setArticlesSuccess } from "./articles.actions";
import appConfigsService from "services/app-configs.service";

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
    dispatch(setContestsPrizesSuccess(contestsPrizes));
  });
  ContestsService.getContestsCategories().then((contestsCategories) => {
    dispatch(setContestsCategoriesSuccess(contestsCategories));
  });
  PhotosService.getPhotos().then((photosData) => {
    dispatch(setPhotosSuccess(photosData));
  });
  UsersService.getJudles().then((judlesData) => {
    dispatch(setJudlesSuccess(judlesData));
  });
  ArticlesService.getArticles().then((articlesData) => {
    dispatch(setArticlesSuccess(articlesData));
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
  dispatch(checkExistedAccountAndSignIn());
  dispatch(setAppLanguage(appConfigsService.activeLang));
  return {
    type,
  };
};
