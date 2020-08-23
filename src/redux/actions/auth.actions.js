import AuthService from "services/auth.service";

const signSuccess = (payload, is_auth) => {
  return {
    type: is_auth ? "LOG_IN_SUCCESS" : "REGISTER_SUCCESS",
    payload,
  };
};

const signError = (error, is_auth) => {
  return {
    type: is_auth ? "LOG_IN_ERROR" : "REGISTER_ERROR",
    payload: error,
  };
};

export const sign = (data, dispatch, is_auth) => {
  const handleSuccess = (response) => {
    if (response.status === 200) {
      dispatch(signSuccess(response, is_auth));
    } else {
      handleError(response);
    }
  };
  const handleError = (errPayload) => {
    dispatch(signError(errPayload, is_auth));
  };
  const reqContext = {
    handleError,
    handleSuccess,
  };
  AuthService.auth(data, reqContext);
};
