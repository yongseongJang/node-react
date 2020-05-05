import { postReducer } from '../../../src/public/reducers/postReducer';
import { postConstants } from '../../../src/public/actions';
import { IPost } from '../../../src/public/actions/types';

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
        isRequesting: false,
    };
    it('should return the initial state', () => {
        expect(postReducer(undefined, {})).toEqual(initialState);
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
})