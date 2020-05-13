import axios from 'axios';
import { IPost } from '../interfaces';

const requestPosts = async (page: number, token: string): Promise<object> => {
    return await axios
        .get(`/api/posts?page=${page}`, { headers: { authorization: 'Bearer ' + token } })
        .then(res => {
            const { pagination, paginatedItems } = res.data;
            return { pagination, paginatedItems };
        })
        .catch(err => {
            throw err;
        })
}

const createPost = async (post: IPost, token: string): Promise<object> => {
    return await axios
        .post('/api/posts/', { post }, { headers: { authorization: 'Bearer ' + token } })
        .then(res => {
            const { _id: postId } = res.data;
            return { postId };
        })
        .catch(err => {
            throw err;
        })
}

const readPost = async (postId: string, token: string): Promise<object> => {
    return await axios
        .get(`/api/posts/${postId}`, { headers: { authorization: 'Bearer ' + token } })
        .then(res => {
            const post = res.data;
            return { post };
        })
        .catch(err => {
            throw err;
        })
}

const updatePost = async (post: IPost, token: string): Promise<void> => {
    return await axios
        .put(`/api/posts/${post._id}`, { post }, { headers: { authorization: 'Bearer ' + token } })
        .then(res => { })
        .catch(err => {
            throw err;
        })
}

export const postServices = {
    requestPosts,
    createPost,
    readPost,
    updatePost
};