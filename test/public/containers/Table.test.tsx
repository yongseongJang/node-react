import * as React from 'react';
import { Table } from '../../../src/public/containers';
import { postActions } from '../../../src/public/actions';
import { mount } from '../enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('<Table />', () => {
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
  const mockStore = configureStore();

  it('should dispatch an action if active pagenation button click', () => {});
});
