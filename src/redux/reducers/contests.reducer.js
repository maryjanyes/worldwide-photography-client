import { setContestAnnouncementsType } from "../actions/contests.actions";

const initialState = {
  contests: [],
  contestCategories: [],
  contestImages: [],
  contestJudles: [],
  contestPrizes: [],
  contestAnnouncements: [],
  contestSubmittions: [],
  lastUploadedImage: null,
};

export default function ContestsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "[CONTESTS] SET_CONTESTS_SUCCESS":
      return {
        ...state,
        contests: payload,
      };
    case "[CONTESTS] SET_CONTESTS_SUBMITTIONS_SUCCESS": {
      return {
        ...state,
        contestSubmittions: payload,
      };
    }
    case "[CONTESTS] UPDATE_SUBMITTION_PHOTO":
      return {
        ...state,
        lastUploadedImage: payload,
      };
    case "[CONTESTS] SET_CONTESTS_PRIZES_SUCCESS": {
      return {
        ...state,
        contestPrizes: payload,
      };
    }
    case "[CONTESTS] SET_CONTESTS_CATEGORIES_SUCCESS": {
      return {
        ...state,
        contestCategories: payload,
      };
    }
    case "[CONTESTS] SET_CONTESTS_JUDLES_SUCCESS": {
      return {
        ...state,
        contestJudles: payload,
      };
    }
    case "[CONTESTS] SET_RECENT_SUBMITTION_SUCCESS": {
      return {
        ...state,
        recentSubmittionSuccess: true,
      };
    }
    case setContestAnnouncementsType: {
      return {
        ...state,
        contestAnnouncements: payload,
      };
    }
    default: {
      return state;
    }
  }
}
