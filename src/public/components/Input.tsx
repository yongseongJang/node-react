import * as React from 'react';
import { Label, Input as InputBox, FormText } from 'reactstrap';

interface InputProps {
  label: string;
  id: string;
  type: any;
  value: string;
  onChange: () => void;
  errorMessage: string;
}

const Input = (props: InputProps) => {
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

export default Input;
