import ContestsService from "services/contests.service";
import PhotosService from "services/photos.service";
import UsersService from "services/users.service";
import ArticlesService from "services/articles.service";
import { apiService } from "services/api.service";
import appConfigsService from "services/app-configs.service";

import {
  setContests,
  setContestsPrizesSuccess,
  setContestsCategoriesSuccess,
} from "./contests.actions";

import { setTranslations, setAppLanguage } from "./ui.actions";
import { setPhotosSuccess } from "./photos.actions";
import { setJudlesSuccess, setUsersSuccess } from "./users.actions";
import { checkExistedAccountAndSignIn } from "./auth.actions";
import { setArticlesSuccess } from "./articles.actions";
import { isDataValid } from "../../utils/data.util";
import { isValidElement } from "react";

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
    if (isDataValid(contestsPrizes)) {
      dispatch(setContestsPrizesSuccess(contestsPrizes));
    }
  });
  ContestsService.getContestsCategories().then((contestsCategories) => {
    if (isDataValid(contestsCategories)) {
      dispatch(setContestsCategoriesSuccess(contestsCategories));
    }
  });
  PhotosService.getPhotos().then((photosData) => {
    if (isDataValid(photosData)) {
      dispatch(setPhotosSuccess(photosData));
    }
  });
  UsersService.getJudles().then((judlesData) => {
    if (isDataValid(judlesData)) {
      dispatch(setJudlesSuccess(judlesData));
    }
  });
  ArticlesService.getArticles().then((articlesData) => {
    if (isDataValid(articlesData)) {
      dispatch(setArticlesSuccess(articlesData));
    }
  });
  UsersService.getUsers().then((usersResponse) => {
    if (isDataValid(usersResponse)) {
      dispatch(setUsersSuccess(usersResponse));
    }
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
