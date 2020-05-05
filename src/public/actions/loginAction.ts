import { ILoginInfo } from './types';

export const loginConstants = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

const login = (loginInfo: ILoginInfo) => {
  return {
    type: loginConstants.LOGIN_REQUEST,
    email: loginInfo.email,
    password: loginInfo.password,
  };
};

const loginSuccess = (token: string, email: string, userName: string) => {
  return { type: loginConstants.LOGIN_SUCCESS, token, email, userName };
};

const loginFailure = (err: Error) => {
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
