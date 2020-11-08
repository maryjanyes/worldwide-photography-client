const initialState = {
  submissionModalState: false,
  translations: {},
  activeLanguage: localStorage.getItem("appLang") || "EN",
};

export default function UIReducer(state = initialState, { payload, type }) {
  switch (type) {
    case "[UI] SET_TRANSLATIONS_DATA_SUCCESS": {
      return {
        ...state,
        translations: payload,
      };
    }
    case "[UI] TOGGLE_SUBMISSION_MODAL": {
      return {
        ...state,
        submissionModalState: payload,
      };
    }
    case "[UI] SET_APP_LANGUAGE": {
      return {
        ...state,
        activeLanguage: payload,
      };
    }
    default:
      return state;
  }
}
