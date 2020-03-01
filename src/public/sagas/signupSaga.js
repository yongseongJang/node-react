import { take, call, put, fork } from 'redux-saga/effects';
import { signupServices } from '../services';
import { signupConstants, signupActions } from '../actions';
import { history } from '../utils/history';

function* signup(userInfo) {
  try {
    yield call(signupServices.signup, userInfo);

    yield put(signupActions.signupSuccess());
    history.replace('/');
  } catch (err) {
    yield put(signupActions.signupFailure(err));
  }
}

function* watchSignupRequest() {
  while (true) {
    const { userInfo } = yield take(signupConstants.SIGNUP_REQUEST);

    yield call(signup, userInfo);
  }
}

export const signupSaga = [fork(watchSignupRequest)];
