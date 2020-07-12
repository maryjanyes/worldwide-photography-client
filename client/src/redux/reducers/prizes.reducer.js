const initialState = {
    prizes: [{
        name: 'Prize one',
        value: 0,
        contest_id: '455464',
    }, {
        name: 'Prize two',
        value: 0,
        contest_id: '455464',
    }],
};

export default function PrizesReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'SET_PRIZES': {
            return {
                ...state,
                prizes: payload,
            };
        }
        default: {
            return state;
        }
    }
};
