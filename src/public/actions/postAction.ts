import { IPost, IPagination } from '../interfaces';

export const postConstants = {
    REQUEST_POSTS: 'REQUEST_POSTS',
    REQUEST_POSTS_SUCCESS: 'RECEIVE_POSTS_SUCCESS',
    REQUEST_POSTS_FAILURE: 'REQUEST_POSTS_FAILURE',
    CREATE_POST: 'CREATE_POST',
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
    CREATE_POST_FAILURE: 'CREATE_POST_FAILURE',
    READ_POST: 'READ_POST',
    READ_POST_SUCCESS: 'READ_POST_SUCCESS',
    READ_POST_FAILURE: 'READ_POST_FAILURE',
    UPDATE_POST: 'UPDATE_POST',
    UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
    UPDATE_POST_FAILURE: 'UPDATE_POST_FAILURE',
    REMOVE_POST: 'REMOVE_POST',
    SET_NEW_POST: 'SET_NEW_POST'
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

const readPost = (postId: string, token: string) => {
    return {
        type: postConstants.READ_POST,
        postId,
        token
    }
}

const readPostSuccess = (post: IPost) => {
    return {
        type: postConstants.READ_POST_SUCCESS,
        post
    }
}

const readPostFailure = () => {
    return {
        type: postConstants.READ_POST_FAILURE,
    }
}

const updatePost = (post: IPost, token: string) => {
    return {
        type: postConstants.UPDATE_POST,
        post,
        token
    }
}

const updatePostSuccess = () => {
    return {
        type: postConstants.UPDATE_POST_SUCCESS
    }
}

const updatePostFailure = () => {
    return {
        type: postConstants.UPDATE_POST_FAILURE
    }
}

const setNewPost = (userName: string, date: string) => {
    return { type: postConstants.SET_NEW_POST, userName, date }
}

export const postActions = {
    requestPosts,
    requestPostsSuccess,
    requestPostsFailure,
    createPost,
    createPostSuccess,
    createPostFailure,
    readPost,
    readPostSuccess,
    readPostFailure,
    setNewPost,
    updatePost,
    updatePostSuccess,
    updatePostFailure
}