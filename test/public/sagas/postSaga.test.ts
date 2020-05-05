import { createPost, watchCreatePost } from '../../../src/public/sagas/postSaga';
import { postConstants, postActions } from '../../../src/public/actions/index'
import { postServices } from '../../../src/public/services/postService';
import { IPost } from '../../../src/public/actions/types';
import { testSaga } from 'redux-saga-test-plan';
import { runSaga } from 'redux-saga';

describe('post saga', () => {
    it('should call createPost function after take create post request', () => {
        const post = {} as IPost;
        const token = 'token';
        testSaga(watchCreatePost)
            .next()
            .take(postConstants.CREATE_POST)
            .next({ post, token })
            .call(createPost, post, token);
    })

    it('should dispatch create post success action if post is valid', async () => {
        const post = {} as IPost;
        const token = 'token';

        postServices.createPost = jest.fn()

        const dispatched = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            createPost,
            post,
            token,
        );

        expect(postServices.createPost).toHaveBeenCalledWith(post, token);
        expect(dispatched).toContainEqual(postActions.createPostSuccess());
    });

    it('should dispatch create post failure action if post is valid', async () => {
        const post = {};
        const token = 'token';
        const error = new Error('Invalid post');

        postServices.createPost = jest.fn().mockImplementation(() => {
            throw error;
        })

        const dispatched = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            createPost,
            post,
            token,
        );

        expect(postServices.createPost).toHaveBeenCalledWith(post, token);
        expect(dispatched).toContainEqual(postActions.createPostFailure());
    });
})