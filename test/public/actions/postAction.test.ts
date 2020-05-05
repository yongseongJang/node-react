import { postConstants, postActions } from '../../../src/public/actions'
import { IPost } from '../../../src/public/actions/types';

describe('post action', () => {
    it('should create an action to post create', () => {
        const post = {} as IPost;
        const token = 'token';

        const expectedAction = {
            type: postConstants.CREATE_POST,
            post: post,
            token: token
        };

        expect(postActions.createPost(post, token)).toEqual(expectedAction);
    })

    it('should create an action to post create success', () => {
        const expectedAction = {
            type: postConstants.CREATE_POST_SUCCESS,
        };
        expect(postActions.createPostSuccess()).toEqual(expectedAction);
    })

    it('should create an action to post create failure', () => {
        const expectedAction = {
            type: postConstants.CREATE_POST_FAILURE,
        };
        expect(postActions.createPostFailure()).toEqual(expectedAction);
    })
})