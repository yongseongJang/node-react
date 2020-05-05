import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { signupReducer } from './signupReducer';
import { postReducer } from './postReducer';

const rootReducer = combineReducers({ loginReducer, signupReducer, postReducer });

export default rootReducer;
