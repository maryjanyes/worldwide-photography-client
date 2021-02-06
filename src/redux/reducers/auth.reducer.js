const initialState = {
  isLoggedIn: false,
  userData: null,
  errorOnAuth: null,
};

export default function AuthReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "[AUTH] AUTH_SUCCESS": {
      localStorage.setItem("UserData", JSON.stringify(payload));
      return {
        ...state,
        userData: payload,
        isLoggedIn: true,
      };
    }
    case "[AUTH] RESET_AUTH_ERROR": {
      return { ...state, errorOnAuth: null } 
    }
    case "[AUTH] REGISTER_SUCCESS": {
      localStorage.setItem("UserData", JSON.stringify(payload));
      return {
        ...state,
        userData: payload,
        isLoggedIn: true,
      };
    }
    case "[AUTH] SET_AUTH_TOKEN": {
      localStorage.setItem("SessionToken", payload);
    }
    case "[AUTH] AUTH_ERROR": {
      return {
        ...state,
        errorOnAuth: payload,
      };
    }
    case "[AUTH] REGISTER_ERROR": {
      return {
        ...state,
        errorOnAuth: payload,
      };
    }
    case "[AUTH] TRY_FIND_ACCOUNT": {
      if (!!payload) {
        return {
          ...state,
          userData: payload,
          isLoggedIn: true,
        };
      }
    }
    case "[AUTH] LOG_OUT": {
      localStorage.removeItem("UserData");
      localStorage.removeItem("SessionToken");
      return {
        ...state,
        userData: null,
        isLoggedIn: false,
        errorOnAuth: null,
      };
    }
    default:
      return state;
  }
}
