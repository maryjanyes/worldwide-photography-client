const initialState = {
    photoSubmittions: [],
};

export default function PhotosReducer(state = initialState, { type, payload }) {
    switch(type) {
        case 'SET_ALL_PHOTOS': {
            return { ...state, allPhotos: payload };
        }
        default: {
            return state;
        }
    }
}
