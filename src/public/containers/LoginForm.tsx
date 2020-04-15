import * as React from 'react';
import loginFields from '../utils/fields/loginFields';
import { Input } from '../components';
import { loginActions } from '../actions';
import withForm from '../hocs/withForm';
import { Form, FormGroup, Button } from 'reactstrap';

interface LoginFormProps {
  renderElements: Function;
  isValidForm: boolean;
  onChange: Function;
  submit: Function;
}

const LoginForm = (props: LoginFormProps) => {
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

export default withForm(loginFields)(LoginForm);
