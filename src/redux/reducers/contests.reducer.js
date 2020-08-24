const initialState = {
  contests: [],
  contestCategories: [],
  contestImages: [],
  contestJudles: [],
  contestPrizes: [],
  contestCategories: [],
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
    case "[CONTESTS] SET_CONTESTS_PRIZES": {
      return {
        ...state,
        contestPrizes: payload,
      };
    }
    default: {
      return state;
    }
  }
}
