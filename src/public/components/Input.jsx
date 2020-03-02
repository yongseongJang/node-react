import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input as InputBox, FormText } from 'reactstrap';

const Input = props => {
  return (
    <div className="Input">
      <Label className="Input__Label">{props.label}</Label>
      <InputBox
        className="Input__Form"
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errorMessage && (
        <FormText className="Input__Error">{props.errorMessage}</FormText>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default Input;
