import ContestsService from "services/contests.service";
import PhotosService from "services/photos.service";
import UsersService from "services/users.service";
import ArticlesService from "services/articles.service";
import { apiService } from "services/api.service";
import { appConfigsService } from "services/app-configs.service";

import { isDataValid } from "utils/data.util";

import {
  setContests,
  setContestsPrizesSuccess,
  setContestsCategoriesSuccess,
} from "./contests.actions";

import { setTranslations, setAppLanguage } from "./ui.actions";
import { setPhotosSubmittionsSuccess } from "./photos.actions";
import { setJudlesSuccess, setUsersSuccess } from "./users.actions";
import { setArticlesSuccess } from "./articles.actions";
import { checkExistedAccountAndSignIn } from "./auth.actions";

import enTranslations from 'mocks/translations/en';
import uaTranslations from 'mocks/translations/ua';

export const initAppData = (dispatch) => {
  ContestsService.getContets().then((contestsResponse) => {
    if (isDataValid(contestsResponse)) {
      dispatch(setContests(contestsResponse.data));
    }
  });
  ContestsService.getContestsPrizes().then((contestsPrizes) => {
    if (isDataValid(contestsPrizes)) {
      dispatch(setContestsPrizesSuccess(contestsPrizes.data));
    }
  });
  ContestsService.getContestsCategories().then((contestsCategories) => {
    if (isDataValid(contestsCategories)) {
      dispatch(setContestsCategoriesSuccess(contestsCategories.data));
    }
  });
  PhotosService.getPhotosSubmittions().then((photosSubmittionsData) => {
    if (isDataValid(photosSubmittionsData)) {
      dispatch(setPhotosSubmittionsSuccess(photosSubmittionsData.data));
    }
  });
  UsersService.getJudles().then((judlesData) => {
    if (isDataValid(judlesData)) {
      dispatch(setJudlesSuccess(judlesData.data));
    }
  });
  ArticlesService.getArticles().then((articlesData) => {
    if (isDataValid(articlesData)) {
      dispatch(setArticlesSuccess(articlesData.data));
    }
  });
  UsersService.getUsers().then((usersResponse) => {
    if (isDataValid(usersResponse)) {
      dispatch(setUsersSuccess(usersResponse.data));
    }
  });
  apiService.getAppTranslations().then((translationsData) => {
    const newTranslationData = translationsData.data?.reduce((acc, tr) => {
      acc[`${tr.key}.${tr.lang}`] = tr.value;
      return acc;
    }, {})
    if (newTranslationData) {
      Object.keys(uaTranslations).forEach(_key => {
        newTranslationData[`${_key}.ua`] = uaTranslations[_key];
      });
      Object.keys(enTranslations).forEach(_key => {
        newTranslationData[`${_key}.en`] = enTranslations[_key];
      });
      dispatch(setTranslations(newTranslationData));
    }
  });
  const type = "[COMMON] INIT_APP_DATA";
  dispatch(checkExistedAccountAndSignIn());
  dispatch(setAppLanguage(appConfigsService.activeLang));
  return {
    type,
  };
};
