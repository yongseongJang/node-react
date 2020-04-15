import * as React from 'react';
import withForm from '../hocs/withForm';
import signupFields from '../utils/fields/signupFields';
import { Input } from '../components';
import { signupActions } from '../actions';
import { Form, FormGroup, Button } from 'reactstrap';

interface SignupProps {
  renderElements: Function;
  isValidForm: boolean;
  onChange: Function;
  submit: Function;
}

const SignupForm = (props: SignupProps) => {
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

export default withForm(signupFields)(SignupForm);
