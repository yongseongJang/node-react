import { postReducer } from '../../../src/public/reducers/postReducer';
import { postConstants } from '../../../src/public/actions';
import { IPost } from '../../../src/public/actions/types';
import { IPagination } from '../../../src/public/reducers/types';

describe('post reducer', () => {
    const initialState = {
        post: {
            id: undefined,
            title: '',
            createdBy: '',
            lastEdited: new Date(),
            tags: [],
            selectedTags: [],
            content: '',
        },
        pagination: {},
        paginatedItems: [],
        isRequesting: false,
    };
    it('should return the initial state', () => {
        expect(postReducer(initialState, {})).toEqual(initialState);
    })

    it('should handle CREATE_POST', () => {
        const action = {
            type: postConstants.CREATE_POST,
            post: {} as IPost,
            token: 'token'
        };
        expect(postReducer(initialState, action)).toEqual({
            ...initialState,
            isRequesting: true
        })
    })

    it('should handle CREATE_POST_SUCCESS', () => {
        const action = {
            type: postConstants.CREATE_POST_SUCCESS,
        };
        expect(postReducer(initialState, action)).toEqual({
            ...initialState,
            isRequesting: false
        })
    })

    it('should handle CREATE_POST_FAILURE', () => {
        const action = {
            type: postConstants.CREATE_POST_FAILURE,
        };
        expect(postReducer(initialState, action)).toEqual({
            ...initialState,
            isRequesting: false
        })
    })

    it('should handle REQUEST_POSTS', () => {
        const page = 1;
        const token = 'token';
        const action = {
            type: postConstants.REQUEST_POSTS,
            page,
            token
        }
        expect(postReducer(initialState, action)).toEqual({
            ...initialState,
            isRequesting: true
        });
    })

    it('should handle REQUEST_POSTS_SUCCESS', () => {
        const pagination = {} as IPagination;
        const paginatedItems = [];
        const action = {
            type: postConstants.REQUEST_POSTS_SUCCESS,
            pagination,
            paginatedItems
        };
        expect(postReducer(initialState, action)).toEqual({
            ...initialState,
            pagination,
            paginatedItems,
            isRequesting: false
        })
    })

    it('should handle REQUEST_POSTS_FAILURE', () => {
        const action = {
            type: postConstants.REQUEST_POSTS_FAILURE,
        };
        expect(postReducer(initialState, action)).toEqual({
            ...initialState,
            isRequesting: false
        })
    })
})