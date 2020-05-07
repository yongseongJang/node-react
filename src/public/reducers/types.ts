import { loginReducerState } from './loginReducer';
import { signupReducerState } from './signupReducer';
import { postReducerState } from './postReducer';

export interface RootState {
    loginReducer: loginReducerState;
    signupReducer: signupReducerState;
    postReducer: postReducerState;
}

export interface IPagination {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: Array<number>;
}