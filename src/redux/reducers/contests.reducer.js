const initialState = {
  contests: [],
  contestCategories: [],
  contestImages: [],
  contestJudles: [],
  contestPrizes: [],
  contestSubmittions: [],
  lastUploadedImage: null,
};

export default function ContestsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "[CONTESTS] SET_CONTESTS":
      return {
        ...state,
        contests: payload,
      };
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
        recentSubitttionSuccess: true,
      };
    }
    default: {
      return state;
    }
  }
}
