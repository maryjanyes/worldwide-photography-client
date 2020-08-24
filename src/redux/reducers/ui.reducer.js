const initialState = {
  submissionModalState: false,
  activeNavItem: "/dashboard",
  translations: {},
};

export default function UIReducer(state = initialState, { payload, type }) {
  switch (type) {
    case "[UI] TOGGLE_SUBMISSION_MODAL": {
      return {
        ...state,
        submissionModalState: payload,
      };
    }
    case "[UI] SET_TRANSLATIONS_DATA": {
      return {
        ...state,
        translations: payload,
      };
    }
    default:
      return state;
  }
}
