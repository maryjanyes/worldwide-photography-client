import ContestsData from '../../mocks/contests.json';
import CategoriesMock from '../../mocks/photo-categories.json';

const initialState = {
    contests: ContestsData,
    categories: CategoriesMock,
    contestAvatars: [],
    judles: [],
    lastSelectedPhotoForSubmit: null,
};

export default function ContestsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'SET_CONTESTS':
            return {
                ...state,
                contests: payload,
            };
        case 'UPDATE_SUBMITTION_PHOTO':
            return {
                ...state,
                lastSelectedPhotoForSubmit: payload,
            };
        default: {
            return state;
        }
    }
}
