const initialState = {
    isLoggedIn: false,
    logInAtProgress: false,
};

export default function AuthReducer(state = initialState, { type, payload }) {
    switch(type) {
        case 'LOG_IN_SUCCESS': {
            return { ...state, isLoggedIn: true };
        }
        default: return state;
    }
}
