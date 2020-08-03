const initialState = {
    submissionModalState: false,
};

export default function UIReducer(state = initialState, { payload, type }) {
    switch (type) {
        case 'TOGGLE_SUBMISSION_MODAL': {
            return {
                ...state,
                submissionModalState: payload,
            };
        }
        default: return state;
    }
}
