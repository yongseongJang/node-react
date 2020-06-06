import { createPost, watchCreatePost, watchRequestPosts, requestPost } from '../../../src/public/sagas/postSaga';
import { postConstants, postActions } from '../../../src/public/actions/index'
import { postServices } from '../../../src/public/services';
import { IPost, IPagination } from '../../../src/public/interfaces';
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

        const dispatched = [] as Array<{ type: string, [key: string]: any }>;
        await runSaga(
            {
                dispatch: (action: { type: string, [key: string]: any }) => dispatched.push(action),
            },
            createPost,
            post,
            token,
        );

        expect(postServices.createPost).toHaveBeenCalledWith(post, token);
        expect(dispatched).toContainEqual(postActions.createPostSuccess());
    });

    it('should dispatch create post failure action if post is valid', async () => {
        const post = {} as IPost;
        const token = 'token';
        const error = new Error('Invalid post');

        postServices.createPost = jest.fn().mockImplementation(() => {
            throw error;
        })

        const dispatched = [] as Array<{ type: string, [key: string]: any }>;
        await runSaga(
            {
                dispatch: (action: { type: string, [key: string]: any }) => dispatched.push(action),
            },
            createPost,
            post,
            token,
        );

        expect(postServices.createPost).toHaveBeenCalledWith(post, token);
        expect(dispatched).toContainEqual(postActions.createPostFailure());
    });

    it('should call requestPost function after take request posts ', () => {
        const page = 1;
        const token = 'token';
        testSaga(watchRequestPosts)
            .next()
            .take(postConstants.REQUEST_POSTS)
            .next({ page, token })
            .call(requestPost, page, token)
    })

    it('should dispatch request post success action if page and token is valid', async () => {
        const pagination = {} as IPagination;
        const paginatedItems = [] as Array<IPost>;

        postServices.requestPosts = jest.fn().mockImplementation((page, token) => {
            return { pagination, paginatedItems };
        });

        const page = 1;
        const token = 'token';
        const dispatched = [] as Array<{ type: string, [key: string]: any }>;
        await runSaga(
            {
                dispatch: (action: { type: string, [key: string]: any }) => dispatched.push(action),
            },
            requestPost,
            page,
            token
        )

        expect(postServices.requestPosts).toHaveBeenCalledWith(page, token);
        expect(dispatched).toContainEqual(postActions.requestPostsSuccess(pagination, paginatedItems));
    })
})