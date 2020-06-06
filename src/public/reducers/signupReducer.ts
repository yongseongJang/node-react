import { signupConstants } from '../actions';

const initailState = {
  isRequesting: false,
  error: null,
};

export const signupReducer = (state = initailState, action: { type: string, [key: string]: any }) => {
  switch (action.type) {
    case signupConstants.SIGNUP_REQUEST:
      return { ...state, isRequesting: true, error: null };
    case signupConstants.SIGNUP_SUCCESS:
      return { ...state, isRequesting: false, error: null };
    case signupConstants.SIGNUP_FAILURE:
      return { ...state, isRequesting: false, error: action.error };
    default:
      return state;
  }
};
