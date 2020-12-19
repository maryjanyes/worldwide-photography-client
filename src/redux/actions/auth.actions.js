import AuthService from "services/auth.service";

const handleAuthToken = (token) => ({
  type: "[AUTH] SET_AUTH_TOKEN",
  payload: token,
});

const signSuccess = (is_auth, response) => ({
  type: (is_auth && "[AUTH] AUTH_SUCCESS") || "[AUTH] REGISTER_SUCCESS",
  payload: response,
});

const signError = payload => ({
  type: "[AUTH] AUTH_ERROR",
  payload,
})

export const resetSignError = () => ({
  type: "[AUTH] RESET_AUTH_ERROR",
})

const sign = async (data, dispatch, is_auth) => {
  const response = await AuthService[(is_auth && "auth") || "register"](data);
  if (response.isSuccess && response.data?.message !== "Password do not match.") {
    if (is_auth) {
      dispatch(handleAuthToken(response.data?.token));
    }
    dispatch(signSuccess(is_auth, response.data?.user));
  } else {
    setTimeout(() => dispatch(signError(response?.message)), 1000);
  }
};

export const signIn = (payload, dispatch) => {
  sign(payload, dispatch, true);
  return {
    type: "[AUTH] TRY_SIGN_IN",
    payload,
  };
};

export const signUp = (payload, dispatch) => {
  sign(payload, dispatch);
  return {
    type: "[AUTH] TRY_SIGN_UP",
    payload,
  };
};

export const checkExistedAccountAndSignIn = () => {
  const userData = localStorage.getItem("UserData");
  return {
    type: "[AUTH] TRY_FIND_ACCOUNT",
    payload: (!!userData && userData !== 'undefined' && JSON.parse(userData)) || null,
  };
};

export const logOut = () => ({
  type: "[AUTH] LOG_OUT",
});

export default {
  logOut,
}
