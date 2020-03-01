import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  return (
    <div className="Input">
      <label className="Input__Label">{props.label}</label>
      <input
        className="Input__Form"
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
      {props.errorMessage && (
        <code className="Input__Error">{props.errorMessage}</code>
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
