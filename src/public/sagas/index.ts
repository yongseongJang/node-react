import { all } from 'redux-saga/effects';
import { loginSaga } from './loginSaga';
import { signupSaga } from './signupSaga';
import { postSaga } from './postSaga';

function* rootSaga() {
  yield all([...loginSaga, ...signupSaga, ...postSaga]);
}

export default rootSaga;
