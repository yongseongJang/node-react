import React from 'react';
import PropTypes from 'prop-types';
import loginFields from '../utils/fields/loginFields';
import { Input } from '../components';
import { loginActions } from '../actions';
import withForm from '../hocs/withForm.jsx';

const LoginForm = props => {
  return (
    <div className="LoginForm">
      <form>
        {props.renderElements().map(formElement => {
          return (
            <Input
              key={formElement.id}
              id={formElement.id}
              label={formElement.config.elementLabel}
              type={formElement.config.inputType}
              value={formElement.config.value}
              onChange={props.onChange}
              errorMessage={formElement.config.errorMessage}
            />
          );
        })}
        <button
          disabled={!props.isValidForm}
          type="button"
          onClick={props.submit(loginActions.login)}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  renderElements: PropTypes.func,
  isValidForm: PropTypes.bool,
  submit: PropTypes.func,
};

export default withForm(loginFields)(LoginForm);
