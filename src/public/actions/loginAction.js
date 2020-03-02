export const loginConstants = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

const login = loginInfo => {
  return {
    type: loginConstants.LOGIN_REQUEST,
    email: loginInfo.email,
    password: loginInfo.password,
  };
};

const loginSuccess = token => {
  return { type: loginConstants.LOGIN_SUCCESS, token };
};

const loginFailure = err => {
  return { type: loginConstants.LOGIN_FAILURE, err };
};

const logout = () => {
  return { type: loginConstants.LOGOUT_REQUEST };
};

const logoutSuccess = () => {
  return { type: loginConstants.LOGOUT_SUCCESS };
};

export const loginActions = {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
};
