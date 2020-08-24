const initialState = {
  isLoggedIn: false,
  logInAtProgress: false,
};

export default function AuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "[AUTH] AUTH_SUCCESS": {
      return {
        ...state,
        userData: payload,
        isLoggedIn: true,
      };
    }
    case "[AUTH] REGISTER_SUCCESS": {
      return {
        ...state,
        userData: payload,
        isLoggedIn: true,
      };
    }
    case "[AUTH] AUTH_ERROR": {
      return {
        ...state,
        error: payload,
      };
    }
    case "[AUTH] REGISTER_ERROR": {
      return {
        ...state,
        error: payload,
      };
    }
    default:
      return state;
  }
}
