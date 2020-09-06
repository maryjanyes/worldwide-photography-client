const initialState = {
  siteUsers: [],
  siteJudles: [],
};

export default function UsersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "[USERS] SET_USERS": {
      return {
        ...state,
        siteUsers: payload,
      };
    }
    case "[USERS] SET_JUDLES": {
      return {
        ...state,
        siteJudles: payload,
      };
    }
    default: {
      return state;
    }
  }
}
