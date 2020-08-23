const initialState = {
    users: [],
};

export default function UsersReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'SET_USERS': {
            return {
                ...state,
                users: payload,
            };
        }
        case 'UPDATE_SIGN_STATUS': {
            return {
                ...state,
                isLoggedIn: payload,
            }
        }
        default: {
            return state;
        }
    }
}
