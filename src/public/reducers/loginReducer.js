import { loginConstants } from '../actions';

const initialState = {
  isRequesting: false,
  loginStatus: false,
  error: null,
  token: null,
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
        token: null,
      };
    default:
      return state;
  }
};
