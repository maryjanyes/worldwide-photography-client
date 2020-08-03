const initialState = {
    isLoggedIn: false,
    logInAtProgress: false,
};

export default function AuthReducer(state = initialState, { type, payload }) {
    switch(type) {
        case 'LOG_IN_SUCCESS': {
            return { ...state, isLoggedIn: true };
        }
        case 'LOG_IN_ERROR': {
            return { ...state, error: payload.status, };
        }
        case 'REGISTER_ERROR': {
            return { ...state, error: payload.status, };
        }
        default: return state;
    }
}
