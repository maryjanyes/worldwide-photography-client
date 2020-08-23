const initialState = {
  allSubmittions: [],
  photoCategories: [],
  // allPhotos: undefined,
};

export default function PhotosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "SET_ALL_PHOTOS": {
      return { ...state, allPhotos: payload };
    }
    default: {
      return state;
    }
  }
}
