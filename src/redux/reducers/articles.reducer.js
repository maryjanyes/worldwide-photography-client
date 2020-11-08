const initialState = {
  allArticles: [],
};

export default function ArticlesReducer(
  state = initialState,
  { payload, type }
) {
  switch (type) {
    case "[ARTICLES] SET_ARTICLES_SUCCESS": {
      return {
        ...state,
        allArticles: payload,
      };
    }
    default: {
      return state;
    }
  }
}
