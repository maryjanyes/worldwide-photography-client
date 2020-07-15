const initialState = {
    articles: [],
};

export default function ArticlesReducer(state = initialState, { action, type }) {
    switch(type) {
        case 'SET_ARTICLES': {
            return {
                ...state,
                articles: [],
            };
        }
        default: return state;
    }
}
