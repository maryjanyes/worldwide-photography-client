const initialState = {
    allPhotos: [],
};

export default function PhotoReducer(state = initialState, { type, payload }) {
    switch(type) {
        case 'SET_ALL_PHOTOS': {
            return { ...state, allPhotos: payload };
        }
        default: {
            return state;
        }
    }
}
