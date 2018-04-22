import React from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => {
  let errorText = '';
  let errorFieldClass = '';

  if(props.error) {
    errorText = <div className="invalid-feedback">{props.error}</div>;
    errorFieldClass = 'is-invalid';
  }

  return(
    <div className='form-group'>
      <label className='form-control-label' htmlFor={props.id}>{props.label}</label>
      <input
        type="text"
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={props.onChange}
        className={`form-control ${errorFieldClass}`}
        required
      />
      {errorText}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default FormField;