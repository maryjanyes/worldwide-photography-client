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
    case "[USERS] SET_JUDLES_SUCCESS": {
      return {
        ...state,
        siteJudles: payload,
      };
    }
    case "[USERS] SET_USERS_SUCCESS": {
      return {
        ...state,
        siteUsers: payload,
      };
    }
    default: {
      return state;
    }
  }
}
