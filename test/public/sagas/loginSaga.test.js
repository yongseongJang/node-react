import {
  checkAuthTimeout,
  login,
  logout,
  watchLoginRequest,
  watchLogoutRequest,
} from '../../../src/public/sagas/loginSaga';
import { take, call, put, delay, fork, cancel } from 'redux-saga/effects';
import { loginActions, loginConstants } from '../../../src/public/actions';
import { loginServices } from '../../../src/public/services';
import { runSaga } from 'redux-saga';
import { createMockTask } from '@redux-saga/testing-utils';
import { testSaga } from 'redux-saga-test-plan';

describe('login saga', () => {
  it('should dispatch logout action if time out', () => {
    const expirationTime = '1';
    const generator = checkAuthTimeout(expirationTime);
    expect(generator.next().value).toEqual(delay(expirationTime));
    expect(generator.next().value).toEqual(put(loginActions.logout()));
    expect(generator.next().done).toBeTruthy();
  });

  it('should dispatch login success action if login info is valid', async () => {
    const token = 'tokenValue';
    const expirationTime = '1';
    const userName = 'test';

    loginServices.login = jest.fn().mockImplementation(() => {
      return { token, expirationTime, userName };
    });

    const email = 'test@gmail.com';
    const password = '123';

    const dispatched = [];
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
      },
      login,
      email,
      password,
    );

    expect(loginServices.login).toHaveBeenCalledWith(email, password);
    expect(dispatched).toContainEqual(
      loginActions.loginSuccess(token, email, userName),
    );
  });

  it('should dispatch login failure action if login info is invalid', async () => {
    const error = new Error('Invalid login Info');

    loginServices.login = jest.fn().mockImplementation(() => {
      throw error;
    });

    const email = 'test';
    const password = '123';

    const dispatched = [];
    const result = await runSaga(
      {
        dispatch: action => dispatched.push(action),
      },
      login,
      email,
      password,
    );

    expect(loginServices.login).toHaveBeenCalledWith(email, password);
    expect(dispatched).toContainEqual(loginActions.loginFailure(error));
  });

  it('should cancel forkCheckAuthTimeout and dispatch logout success action', () => {
    testSaga(logout)
      .next()
      .inspect(effect => {
        expect(effect.payload.meta.name).toEqual('checkAuthTimeout');
      })
      .next()
      .put(loginActions.logoutSuccess())
      .next()
      .isDone();
  });

  it('should call login function after take login request ', () => {
    const email = 'test@gmail.com';
    const password = '123';
    testSaga(watchLoginRequest)
      .next()
      .inspect(effect => {
        expect(effect).toEqual(take(loginConstants.LOGIN_REQUEST));
      })
      .next({ email, password })
      .call(login, email, password);
  });

  it('should call logout function after take logout request ', () => {
    testSaga(watchLogoutRequest)
      .next()
      .take(loginConstants.LOGOUT_REQUEST)
      .next()
      .call(logout);
  });
});
