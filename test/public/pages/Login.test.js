import React from 'react';
import { mount } from '../enzyme';
import { Login } from '../../../src/public/pages';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('<Login/>', () => {
  const mockStore = configureStore();
  it('should render one <NavLink/> components', () => {
    const history = createBrowserHistory();
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(wrapper.find('NavLink')).toHaveLength(1);
  });
});
