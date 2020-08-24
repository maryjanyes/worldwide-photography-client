const initialState = {
  photoCategories: [],
  allPhotos: [],
};

export default function PhotosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "[PHOTOS] SET_PHOTOS": {
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
