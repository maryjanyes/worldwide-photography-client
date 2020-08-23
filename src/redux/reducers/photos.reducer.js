const initialState = {
  photoCategories: [],
  allImages: undefined,
};

export default function PhotosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "[IMAGES] SET_ALL_IMAGES": {
      return { ...state, allImages: payload };
    }
    default: {
      return state;
    }
  }
}
