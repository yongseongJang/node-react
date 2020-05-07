import { postConstants } from '../actions';
import { IPost } from '../actions/types'
import { IPagination } from './types';

export interface postReducerState {
    post: IPost;
    pagination: IPagination;
    paginatedItems: Array<IPost>;
    isRequesting: boolean;
}

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
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case postConstants.REQUEST_POSTS:
            return { ...state, isRequesting: true };
        case postConstants.REQUEST_POSTS_SUCCESS:
            return { ...state, pagination: action.pagination, paginatedItems: action.paginatedItems, isRequesting: false }
        case postConstants.REQUEST_POSTS_FAILURE:
            return { ...state, isRequesting: false };
        case postConstants.CREATE_POST:
            return { ...state, isRequesting: true };
        case postConstants.CREATE_POST_SUCCESS:
            return { ...state, isRequesting: false };
        case postConstants.CREATE_POST_FAILURE:
            return { ...state, isRequesting: false };
        default:
            return state;
    }
}