import React from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => {
  return(
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="text"
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={props.onChange}
        className="form-control"
      />
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default FormField;