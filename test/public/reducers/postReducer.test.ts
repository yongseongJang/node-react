import { postReducer } from '../../../src/public/reducers/postReducer';
import { postConstants } from '../../../src/public/actions';
import { IPost, IPagination } from '../../../src/public/interfaces';

describe('post reducer', () => {
    const initialState = {
        post: {
            _id: undefined,
            title: '',
            createdBy: '',
            lastEdited: '',
            tags: [],
            selectedTags: [],
            content: '',
        },
        pagination: {},
        paginatedItems: [],
        isRequesting: false,
    };

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
        const pagination = {
            totalItems: 1,
            currentPage: 1,
            pageSize: 3,
            totalPages: 1,
            startPage: 1,
            endPage: 1,
            startIndex: 1,
            endIndex: 1,
            pages: [1]
        };
        const paginatedItems = [
            {
                title: 'test1',
                createdBy: 't',
                lastEdited: '2020-02-02',
                tags: [],
                selectedTags: [],
                content: '1'
            }
        ];
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