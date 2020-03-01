import React from 'react';
import PropTypes from 'prop-types';
import withForm from '../hocs/withForm.jsx';
import signupFields from '../utils/fields/signupFields';
import { Input } from '../components';
import { signupActions } from '../actions';
import { Button } from 'reactstrap';
const SignupForm = props => {
  return (
    <div className="SingUpForm">
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
        <Button
          disabled={!props.isValidForm}
          color="primary"
          onClick={props.submit(signupActions.signup)}
        >
          Join
        </Button>
      </form>
    </div>
  );
};

SignupForm.propTypes = {
  renderElements: PropTypes.func,
  isValidForm: PropTypes.bool,
  submit: PropTypes.func,
};

export default withForm(signupFields)(SignupForm);
