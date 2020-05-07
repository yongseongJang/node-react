import axios from 'axios';
import { IPost } from '../actions/types';

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

export const postServices = {
    requestPosts,
    createPost,
};