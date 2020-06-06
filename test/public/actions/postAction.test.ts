import { postConstants, postActions } from '../../../src/public/actions'
import { IPost, IPagination } from '../../../src/public/interfaces';

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

    it('should create an action to request posts', () => {
        const page = 1;
        const token = 'token';
        const expectedAction = {
            type: postConstants.REQUEST_POSTS,
            page,
            token
        }
        expect(postActions.requestPosts(page, token)).toEqual(expectedAction);
    });

    it('should create an action to request posts success', () => {
        const pagination = {} as IPagination;
        const paginatedItems = [] as Array<IPost>;
        const expectedAction = {
            type: postConstants.REQUEST_POSTS_SUCCESS,
            pagination,
            paginatedItems
        };
        expect(postActions.requestPostsSuccess(pagination, paginatedItems)).toEqual(expectedAction);
    })

    it('should create an action to request posts success', () => {
        const expectedAction = {
            type: postConstants.REQUEST_POSTS_FAILURE,
        };
        expect(postActions.requestPostsFailure()).toEqual(expectedAction);
    })
})