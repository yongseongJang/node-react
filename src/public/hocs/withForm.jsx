import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { validate } from '../utils/validations';

const withForm = formInitialData => WrappedComponent => {
  return props => {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({ ...formInitialData });
    const [formValidation, setFormValidation] = useState(false);

    const renderElements = () => {
      const formElements = [];
      for (let key in formState) {
        formElements.push({
          id: key,
          config: formState[key],
        });
      }
      return formElements;
    };

    const IsFormValid = form => {
      let isValid = true;
      for (let formElement in form) {
        isValid = isValid && form[formElement].valid;
      }
      return isValid;
    };

    const onChange = e => {
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

    const getFormValues = () => {
      let formValues = {};
      for (let key in formState) {
        formValues = { ...formValues, [key]: formState[key].value };
      }
      return formValues;
    };

    const submit = action => () => {
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
