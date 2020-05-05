import { IPost } from './types';

export const postConstants = {
    REQUEST_POSTS: 'REQUEST_POSTS',
    RECEIVE_POSTS: 'RECEIVE_POSTS',
    CREATE_POST: 'CREATE_POST',
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
    CREATE_POST_FAILURE: 'CREATE_POST_FAILURE',
    READ_POST: 'READ_POST',
    UPDATE_POST: 'UPDATE_POST',
    REMOVE_POST: 'REMOVE_POST',
}

const createPost = (post: IPost, token: string) => {
    return {
        type: postConstants.CREATE_POST,
        post: post,
        token: token
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
    createPost,
    createPostSuccess,
    createPostFailure
}