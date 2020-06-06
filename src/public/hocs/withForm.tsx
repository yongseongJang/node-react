import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { validate } from '../utils/validations';
import { IFields } from '../utils/fields/types';

const withForm = (formInitialData: { [key: string]: IFields }) => (
  WrappedComponent: React.FC<any>,
) => {
  return (props: any) => {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState<{ [key: string]: IFields }>({
      ...formInitialData,
    });
    const [formValidation, setFormValidation] = useState<boolean>(false);

    const renderElements = (): Array<object> => {
      const formElements = [];
      for (let key in formState) {
        formElements.push({
          id: key,
          config: formState[key],
        });
      }
      return formElements;
    };

    const IsFormValid = (form: { [key: string]: IFields }): boolean => {
      let isValid = true;
      for (let formElement in form) {
        isValid = isValid && form[formElement].valid;
      }
      return isValid;
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const key = e.target.id;
      const validation = validate(inputValue, formState[key].validation);
      const formData = {
        ...formState,
        [key]: {
          ...formState[key],
          value: inputValue,
          valid: validation.isValid,
          errorMessage: validation.error,
        },
      };
      setFormState(formData);
      setFormValidation(IsFormValid(formData));
    };

    const getFormValues = (): object => {
      let formValues = {};
      for (let key in formState) {
        formValues = { ...formValues, [key]: formState[key].value };
      }
      return formValues;
    };

    const submit = (action: Function) => () => {
      const formValues = getFormValues();
      dispatch(action(formValues));
    };

    return (
      <WrappedComponent
        {...props}
        renderElements={renderElements}
        isValidForm={formValidation}
        onChange={onChange}
        submit={submit}
      />
    );
  };
};

export default withForm;
