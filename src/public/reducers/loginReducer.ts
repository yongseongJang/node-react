import { loginConstants } from '../actions';

export interface loginReducerState {
  isRequesting: boolean;
  loginStatus: boolean;
  error: Error;
  token: string;
  email: string;
  userName: string;
}

const initialState = {
  isRequesting: false,
  loginStatus: false,
  error: null,
  token: '',
  email: '',
  userName: '',
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return { ...state, isRequesting: true };
    case loginConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        loginStatus: true,
        error: null,
        token: action.token,
        email: action.email,
        userName: action.userName
      };
    case loginConstants.LOGIN_FAILURE:
      return { ...state, isRequesting: false, error: action.err };
    case loginConstants.LOGOUT_REQUEST:
      return { ...state, isRequesting: true };
    case loginConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        loginStatus: false,
        error: null,
        token: '',
        email: '',
        userName: '',
      };
    default:
      return state;
  }
};
