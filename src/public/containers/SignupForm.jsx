import React from 'react';
import PropTypes from 'prop-types';
import withForm from '../hocs/withForm.jsx';
import signupFields from '../utils/fields/signupFields';
import { Input } from '../components';
import { signupActions } from '../actions';
import { Form, FormGroup, Button } from 'reactstrap';
const SignupForm = props => {
  return (
    <div className="SingUpForm">
      <Form>
        {props.renderElements().map(formElement => {
          return (
            <FormGroup key={formElement.id}>
              <Input
                id={formElement.id}
                label={formElement.config.elementLabel}
                type={formElement.config.inputType}
                value={formElement.config.value}
                onChange={props.onChange}
                errorMessage={formElement.config.errorMessage}
              />
            </FormGroup>
          );
        })}
        <Button
          className="SignupForm__Button"
          disabled={!props.isValidForm}
          color="primary"
          type="button"
          onClick={props.submit(signupActions.signup)}
        >
          Join
        </Button>
      </Form>
    </div>
  );
};

SignupForm.propTypes = {
  renderElements: PropTypes.func,
  isValidForm: PropTypes.bool,
  submit: PropTypes.func,
};

export default withForm(signupFields)(SignupForm);
