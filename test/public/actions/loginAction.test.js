import { loginConstants, loginActions } from '../../../src/public/actions';

describe('login action', () => {
  it('should create an action to login request', () => {
    const loginInfo = { email: 'test@gmail.com', password: '123' };

    const expectedAction = {
      type: loginConstants.LOGIN_REQUEST,
      email: loginInfo.email,
      password: loginInfo.password,
    };
    expect(loginActions.login(loginInfo)).toEqual(expectedAction);
  });

  it('should create an action to login success', () => {
    const token = 'tokenValue';

    const expectedAction = {
      type: loginConstants.LOGIN_SUCCESS,
      token,
    };
    expect(loginActions.loginSuccess(token)).toEqual(expectedAction);
  });

  it('should create an action to login failure', () => {
    const err = 'errorMessage';

    const expectedAction = {
      type: loginConstants.LOGIN_FAILURE,
      err,
    };
    expect(loginActions.loginFailure(err)).toEqual(expectedAction);
  });

  it('should create an action to logout request', () => {
    const expectedAction = {
      type: loginConstants.LOGOUT_REQUEST,
    };
    expect(loginActions.logout()).toEqual(expectedAction);
  });

  it('should create an action to logout success', () => {
    const expectedAction = {
      type: loginConstants.LOGOUT_SUCCESS,
    };
    expect(loginActions.logoutSuccess()).toEqual(expectedAction);
  });
});
