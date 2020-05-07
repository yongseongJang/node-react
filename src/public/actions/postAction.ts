import { IPost } from './types';
import { IPagination } from '../reducers/types';

export const postConstants = {
    REQUEST_POSTS: 'REQUEST_POSTS',
    REQUEST_POSTS_SUCCESS: 'RECEIVE_POSTS_SUCCESS',
    REQUEST_POSTS_FAILURE: 'REQUEST_POSTS_FAILURE',
    CREATE_POST: 'CREATE_POST',
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
    CREATE_POST_FAILURE: 'CREATE_POST_FAILURE',
    READ_POST: 'READ_POST',
    UPDATE_POST: 'UPDATE_POST',
    REMOVE_POST: 'REMOVE_POST',
}

const requestPosts = (page: number = 1, token: string) => {
    return {
        type: postConstants.REQUEST_POSTS,
        page,
        token
    }
}

const requestPostsSuccess = (pagination: IPagination, paginatedItems: Array<IPost>) => {
    return {
        type: postConstants.REQUEST_POSTS_SUCCESS,
        pagination,
        paginatedItems
    }
}

const requestPostsFailure = () => {
    return {
        type: postConstants.REQUEST_POSTS_FAILURE,
    }
}

const createPost = (post: IPost, token: string) => {
    return {
        type: postConstants.CREATE_POST,
        post,
        token
    }
}

const createPostSuccess = () => {
    return {
        type: postConstants.CREATE_POST_SUCCESS
    }
}

const createPostFailure = () => {
    return {
        type: postConstants.CREATE_POST_FAILURE
    }
}

export const postActions = {
    requestPosts,
    requestPostsSuccess,
    requestPostsFailure,
    createPost,
    createPostSuccess,
    createPostFailure
}