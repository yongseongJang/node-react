import { IPost, IPagination } from '../interfaces';

export interface RootState {
    loginReducer: loginReducerState;
    signupReducer: signupReducerState;
    postReducer: postReducerState;
}

export interface loginReducerState {
    isRequesting: boolean;
    loginStatus: boolean;
    error: Error;
    token: string;
    email: string;
    userName: string;
}


export interface signupReducerState {
    isRequesting: boolean;
    error: Error;
}

export interface postReducerState {
    post: IPost;
    pagination: IPagination;
    paginatedItems: Array<IPost>;
    isRequesting: boolean;
}