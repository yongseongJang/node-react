import axios from 'axios';
import { IPost } from '../actions/types';

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
    createPost,
};