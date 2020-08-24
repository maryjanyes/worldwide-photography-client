import AuthService from "services/auth.service";

const handleAuthToken = (token) => ({
  type: "[AUTH] SET_AUTH_TOKEN",
  payload: token,
});

const signSuccess = (is_auth, response) => ({
  type: (is_auth && "[AUTH] AUTH_SUCCESS") || "[AUTH] REGISTER_SUCCESS",
  payload: response,
});

const sign = async (data, dispatch, is_auth) => {
  const response = await AuthService[(is_auth && "auth") || "register"](data);
  if (response.code !== 400) {
    if (is_auth) {
      dispatch(handleAuthToken(response.token));
    }
    dispatch(signSuccess(is_auth, response.data || response.user));
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
