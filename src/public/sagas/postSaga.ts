import { take, call, put, fork } from 'redux-saga/effects';
import { postConstants, postActions } from '../actions'
import { postServices } from '../services';
import { IPost } from '../interfaces';

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

export function* readPost(postId: string, token: string) {
    try {
        const { post } = yield call(postServices.readPost, postId, token);

        yield put(postActions.readPostSuccess(post));
    } catch (err) {
        yield put(postActions.readPostFailure());
    }
}

export function* updatePost(post: IPost, token: string) {
    try {
        yield call(postServices.updatePost, post, token);

        yield put(postActions.updatePostSuccess());
    } catch (err) {
        yield put(postActions.updatePostFailure());
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

export function* watchReadPost() {
    while (true) {
        const { postId, token } = yield take(postConstants.READ_POST);
        yield call(readPost, postId, token);
    }
}

export function* watchUpdatePost() {
    while (true) {
        const { post, token } = yield take(postConstants.UPDATE_POST);
        yield call(updatePost, post, token);
    }
}

export const postSaga = [fork(watchRequestPosts), fork(watchCreatePost), fork(watchReadPost), fork(watchUpdatePost)]