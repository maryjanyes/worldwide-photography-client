const initialState = {
  photoCategories: [],
  photoSubmittions: [],
};

export default function PhotosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "[PHOTOS] SET_PHOTOS_SUBMITTIONS_SUCCESS": {
      return {
        ...state,
        photoSubmittions: payload,
      };
    }
    default: {
      return state;
    }
  }
}
