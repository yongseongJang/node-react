import React from 'react';
import { shallow } from '../enzyme';
import { Input } from '../../../src/public/components';

describe('<Input>', () => {
  const formElement = {
    id: 'email',
    label: 'email',
    type: 'text',
    value: 'test@gmail.com',
    onChange: jest.fn(),
    errorMessage: null,
  };
  it('should renders self', () => {
    const wrapper = shallow(
      <Input
        id={formElement.id}
        label={formElement.label}
        type={formElement.type}
        value={formElement.value}
        onChange={formElement.onChange}
        errorMessage={formElement.errorMessage}
      />,
    );

    expect(
      wrapper
        .find('.Input__Label')
        .render()
        .text(),
    ).toBe(formElement.label);
    expect(wrapper.find('.Input__Form').prop('value')).toBe(formElement.value);
    expect(wrapper.find('.Input__Error').isEmpty()).toEqual(true);
  });

  it('should renders `.Input__Error` if errorMessage is not null', () => {
    const errorMessage = 'Error Message';
    const wrapper = shallow(
      <Input
        id={formElement.id}
        label={formElement.label}
        type={formElement.type}
        value=""
        onChange={formElement.onChange}
        errorMessage={errorMessage}
      />,
    );

    expect(
      wrapper
        .find('.Input__Error')
        .render()
        .text(),
    ).toBe(errorMessage);
  });
});
