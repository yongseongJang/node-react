import * as React from 'react';
import { mount } from '../enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { postActions } from '../../../src/public/actions';
import { Post } from '../../../src/public/containers';

describe('<Post />', () => {
  const initialState = {
    loginReducer: {
      userName: 'test',
      token: 'token',
    },
    postReducer: {
      post: {
        _id: undefined,
        title: '',
        createdBy: '',
        lastEdited: '',
        tags: [],
        selectedTags: [],
        content: '',
      },
      pagination: {
        totalItems: 1,
        currentPage: 1,
        pageSize: 3,
        totalPages: 1,
        startPage: 1,
        endPage: 1,
        startIndex: 1,
        endIndex: 1,
        pages: [1],
      },
      paginatedItems: [
        {
          _id: '1',
          title: '1',
          createdBy: 't',
          lastEdited: '2020-02-02',
          tags: [],
          selectedTags: [],
          content: '1',
        },
      ],
      isRequesting: false,
    },
  };
  const mockStore = configureStore();
  it('should dispatch set new post action if post id is new ', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const closePost = jest.fn();

    const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month =
        (date.getMonth() + 1) / 10 >= 1
          ? (date.getMonth() + 1).toString()
          : '0' + (date.getMonth() + 1).toString();
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    };

    const wrapper = mount(
      <Provider store={store}>
        <Post isOpen={true} toggle={closePost} postId="new" />
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      postActions.setNewPost(
        initialState.loginReducer.userName,
        getCurrentDate(),
      ),
    );
  });

  it('should dispatch read post action if post id is not new ', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const closePost = jest.fn();
    const postId = '1';

    const wrapper = mount(
      <Provider store={store}>
        <Post isOpen={true} toggle={closePost} postId={postId} />
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      postActions.readPost(postId, initialState.loginReducer.token),
    );
  });
});
