const initialState = {
  photoCategories: [],
  allPhotos: [],
};

export default function PhotosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "[PHOTOS] SET_PHOTOS_SUBMITTIONS_SUCCESS": {
      return {
        ...state,
        allPhotos: payload,
      };
    }
    case "[PHOTOS] SET_PHOTOS_SUCCESS": {
      return {
        ...state,
        allPhotos: payload,
      };
    }
    default: {
      return state;
    }
  }
}
