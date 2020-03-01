import React from 'react';
import { LoginForm } from '../../../src/public/containers';
import { loginActions } from '../../../src/public/actions';
import { mount } from '../enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('<LoginForm />', () => {
  const initialState = {
    isRequesting: false,
    loginStatus: false,
    error: null,
    token: null,
  };
  const mockStore = configureStore();

  it('should render two <Input/> components', () => {
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );
    expect(wrapper.find('Input')).toHaveLength(2);
  });

  it('should not trigger button click event if form is empty', () => {
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    expect(wrapper.find('button').prop('disabled')).toBe(true);
  });

  it('should dispatch an action if button click', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    wrapper.find('input[id="email"]').invoke('onChange')({
      target: { id: 'email', value: 'test@gmail.com' },
    });
    wrapper.find('input[id="password"]').invoke('onChange')({
      target: { id: 'password', value: 'test' },
    });

    wrapper.find('button').simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      loginActions.login({ email: 'test@gmail.com', password: 'test' }),
    );
  });
});
