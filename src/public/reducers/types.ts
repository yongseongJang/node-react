import { loginReducerState } from './loginReducer';
import { signupReducerState } from './signupReducer';
import { postReducerState } from './postReducer';

export interface RootState {
    loginReducer: loginReducerState;
    signupReducer: signupReducerState;
    postReducer: postReducerState;
}