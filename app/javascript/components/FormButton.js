import React from 'react';
import PropTypes from 'prop-types';

const FormButton = (props) => {
  return(
    <div>
      <button type="submit" className="submit-button btn btn-primary">{props.label}</button>
    </div>
  );
};

FormButton.propTypes = {
  label: PropTypes.string,
};

export default FormButton;