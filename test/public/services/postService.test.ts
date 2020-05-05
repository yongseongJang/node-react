import { postServices } from '../../../src/public/services';
import axios from 'axios';
import { IPost } from '../../../src/public/actions/types';

describe('post service', () => {
    it('should return post ID if request create post with valid post', async () => {
        const post = {} as IPost;
        const token = 'token';
        const res = {
            data: {
                _id: 'postID'
            }
        }
        axios.post = jest.fn().mockReturnValue(Promise.resolve(res));

        const result = await postServices.createPost(post, token);
        expect(result).toEqual({
            postId: res.data._id
        })
    });
    it('should throw error if request create post with invalid post', async () => {
        const error = new Error('Invalid post');
        axios.post = jest.fn().mockReturnValue(Promise.reject(error));

        expect(postServices.createPost({}, 'token')).rejects.toThrow(error);
    })
})