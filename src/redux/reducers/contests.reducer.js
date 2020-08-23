const initialState = {
  contests: [],
  contestCategories: [],
  contestImages: [],
  contestJudles: [],
  contestPrizes: [
    {
      name: "ok1",
    },
  ],
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
        // uploadedImage: payload.name,
      };
    case "[CONTESTS] SET_PRIZES": {
      return {
        ...state,
        prizes: payload,
      };
    }
    default: {
      return state;
    }
  }
}
