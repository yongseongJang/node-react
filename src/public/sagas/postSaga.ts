import { take, call, put, fork } from 'redux-saga/effects';
import { postConstants, postActions } from '../actions'
import { postServices } from '../services';
import { IPost } from '../actions/types';

export function* createPost(post: IPost, token: string) {
    try {
        yield call(postServices.createPost, post, token);

        yield put(postActions.createPostSuccess());
    } catch (err) {
        yield put(postActions.createPostFailure());
    }
}

export function* watchCreatePost() {
    while (true) {
        const { post, token } = yield take(postConstants.CREATE_POST);
        yield call(createPost, post, token);
    }
}

export const postSaga = [fork(watchCreatePost)]