const initialState = {
    contests: [],
    categories: [{
        name: 'Movies',
    }, {
        name: 'Blogs'
    }, {
        name: 'Animals',
    }, {
        name: 'Peoples'
    }, {
        name: 'Art&Culture',
    }, {
        name: 'Music'
    }],
};

export default function ContestsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'SET_CONTESTS':
            return {
                ...state,
                contests: payload,
            };
        default: {
            return state;
        }
    }
}
