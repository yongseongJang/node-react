import * as React from 'react';
import { shallow, mount } from '../enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Pagination } from '../../../src/public/components';
import { postConstants, postActions } from '../../../src/public/actions';

describe('<Pagination />', () => {
  const initialState = {
    loginReducer: {
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
        totalItems: 4,
        currentPage: 1,
        pageSize: 3,
        totalPages: 2,
        startPage: 1,
        endPage: 2,
        startIndex: 1,
        endIndex: 3,
        pages: [1, 2],
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
        {
          _id: '2',
          title: '2',
          createdBy: 't',
          lastEdited: '2020-02-02',
          tags: [],
          selectedTags: [],
          content: '2',
        },
        {
          _id: '3',
          title: '3',
          createdBy: 't',
          lastEdited: '2020-02-02',
          tags: [],
          selectedTags: [],
          content: '3',
        },
        {
          _id: '4',
          title: '4',
          createdBy: 't',
          lastEdited: '2020-02-02',
          tags: [],
          selectedTags: [],
          content: '4',
        },
      ],
      isRequesting: false,
    },
  };

  const mockStore = configureStore();

  it('should renders `.page` if props.pages is not null', () => {
    const getPage = jest.fn();

    const wrapper = shallow(
      <Pagination
        currentPage={initialState.postReducer.pagination.currentPage}
        totalPages={initialState.postReducer.pagination.totalPages}
        startPage={initialState.postReducer.pagination.startPage}
        endPage={initialState.postReducer.pagination.endPage}
        pages={initialState.postReducer.pagination.pages}
        getPage={getPage}
      />,
    );

    expect(wrapper.find('#page')).toHaveLength(2);
  });

  it('should dispatch an action if active pagenation button click', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const getPage = (requestPage: number) => {
      store.dispatch(
        postActions.requestPosts(requestPage, initialState.loginReducer.token),
      );
    };

    const wrapper = mount(
      <Provider store={store}>
        <Pagination
          currentPage={initialState.postReducer.pagination.currentPage}
          totalPages={initialState.postReducer.pagination.totalPages}
          startPage={initialState.postReducer.pagination.startPage}
          endPage={initialState.postReducer.pagination.endPage}
          pages={initialState.postReducer.pagination.pages}
          getPage={getPage}
        />
      </Provider>,
    );

    wrapper
      .find('.Pagination #next')
      .hostNodes()
      .simulate('click');

    expect(store.dispatch).toHaveBeenCalledWith({
      page: initialState.postReducer.pagination.currentPage + 1,
      token: initialState.loginReducer.token,
      type: postConstants.REQUEST_POSTS,
    });
  });
});
