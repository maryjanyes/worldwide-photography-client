const initialState = {
    categories: [],
};

export default function CategoriesReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'SET_CATEGORIES': {
            return {
                ...state,
                categories: payload,
            };
        }
        default: {
            return state;
        }
    }
}
