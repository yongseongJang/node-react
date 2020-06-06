import { postConstants } from '../actions';

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
}

export const postReducer = (state = initialState, action: { type: string, [key: string]: any }) => {
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
        case postConstants.READ_POST:
            return { ...state, isRequesting: true };
        case postConstants.READ_POST_SUCCESS:
            return { ...state, post: action.post, isRequesting: false }
        case postConstants.READ_POST_FAILURE:
            return { ...state, isRequesting: false }
        case postConstants.UPDATE_POST:
            return { ...state, isRequesting: true }
        case postConstants.UPDATE_POST_SUCCESS:
            return { ...state, isRequesting: false }
        case postConstants.UPDATE_POST_FAILURE:
            return { ...state, isRequesting: false }
        case postConstants.SET_NEW_POST:
            return { ...state, post: { ...initialState.post, createdBy: action.userName, lastEdited: action.date } };
        default:
            return state;
    }
}