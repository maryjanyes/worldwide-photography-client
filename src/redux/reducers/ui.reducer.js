const initialState = {
  submissionModalState: false,
  activeNavItem: "/dashboard",
};

export default function UIReducer(state = initialState, { payload, type }) {
  switch (type) {
    case "[UI] TOGGLE_SUBMISSION_MODAL": {
      return {
        ...state,
        submissionModalState: payload,
      };
    }
    default:
      return state;
  }
}
