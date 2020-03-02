import React from 'react';
import PropTypes from 'prop-types';
import loginFields from '../utils/fields/loginFields';
import { Input } from '../components';
import { loginActions } from '../actions';
import withForm from '../hocs/withForm.jsx';
import { Form, FormGroup, Button } from 'reactstrap';

const LoginForm = props => {
  return (
    <div className="LoginForm">
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
          className="LoginForm__Button"
          disabled={!props.isValidForm}
          color="primary"
          type="button"
          onClick={props.submit(loginActions.login)}
        >
          Sign in
        </Button>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  renderElements: PropTypes.func,
  isValidForm: PropTypes.bool,
  submit: PropTypes.func,
};

export default withForm(loginFields)(LoginForm);
