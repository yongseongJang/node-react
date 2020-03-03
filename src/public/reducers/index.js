import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { signupReducer } from './signupReducer';

const rootReducer = combineReducers({ loginReducer, signupReducer });

export default rootReducer;
