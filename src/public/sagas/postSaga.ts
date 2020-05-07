import { take, call, put, fork } from 'redux-saga/effects';
import { postConstants, postActions } from '../actions'
import { postServices } from '../services';
import { IPost } from '../actions/types';

export function* requestPost(page: number, token: string) {
    try {
        const { pagination, paginatedItems } = yield call(postServices.requestPosts, page, token);

        yield put(postActions.requestPostsSuccess(pagination, paginatedItems));
    } catch (err) {
        yield put(postActions.requestPostsFailure());
    }
}

export function* createPost(post: IPost, token: string) {
    try {
        yield call(postServices.createPost, post, token);

        yield put(postActions.createPostSuccess());
    } catch (err) {
        yield put(postActions.createPostFailure());
    }
}

export function* watchRequestPosts() {
    while (true) {
        const { page, token } = yield take(postConstants.REQUEST_POSTS);
        yield call(requestPost, page, token);
    }
}

export function* watchCreatePost() {
    while (true) {
        const { post, token } = yield take(postConstants.CREATE_POST);
        yield call(createPost, post, token);
    }
}

export const postSaga = [fork(watchRequestPosts), fork(watchCreatePost)]