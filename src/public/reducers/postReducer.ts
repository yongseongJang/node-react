import { postConstants } from '../actions';
import { IPost } from '../actions/types'

export interface postReducerState {
    post: IPost;
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
    isRequesting: false,
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
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