import { loginReducer } from '../../../src/public/reducers/loginReducer';
import { loginConstants } from '../../../src/public/actions';

describe('login reducer', () => {
  const initialState = {
    isRequesting: false,
    loginStatus: false,
    error: null,
    token: null,
  };
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_REQUEST', () => {
    const action = {
      type: loginConstants.LOGIN_REQUEST,
      loginInfo: {
        email: 'test@gmail.com',
        password: '123',
      },
    };
    expect(loginReducer(initialState, action)).toEqual({
      ...initialState,
      isRequesting: true,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: loginConstants.LOGIN_SUCCESS,
      token: 'tokenValue',
    };
    expect(loginReducer(initialState, action)).toEqual({
      ...initialState,
      isRequesting: false,
      loginStatus: true,
      error: null,
      token: action.token,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    const action = {
      type: loginConstants.LOGIN_FAILURE,
      err: 'errorMessage',
    };
    expect(loginReducer(initialState, action)).toEqual({
      ...initialState,
      isRequesting: false,
      error: action.err,
    });
  });

  it('should handle LOGOUT_REQUEST', () => {
    const action = {
      type: loginConstants.LOGOUT_REQUEST,
    };
    expect(loginReducer(initialState, action)).toEqual({
      ...initialState,
      isRequesting: true,
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const action = {
      type: loginConstants.LOGOUT_SUCCESS,
    };
    expect(loginReducer(initialState, action)).toEqual({
      ...initialState,
      isRequesting: false,
      loginStatus: false,
      error: null,
      token: null,
    });
  });
});
