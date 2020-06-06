import * as React from 'react';
import { Table } from '../../../src/public/containers';
import { postActions } from '../../../src/public/actions';
import { mount } from '../enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('<Table />', () => {
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
      ],
      isRequesting: false,
    },
  };
  const mockStore = configureStore();

  it('should dispatch an action to get page', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <Table />
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      postActions.requestPosts(1, initialState.loginReducer.token),
    );
  });

  it('should open modal if post item is clicked', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <Table />
      </Provider>,
    );

    expect(wrapper.find('Modal').prop('isOpen')).toBe(false);

    wrapper
      .find('#post_1')
      .hostNodes()
      .simulate('click');

    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });
});
