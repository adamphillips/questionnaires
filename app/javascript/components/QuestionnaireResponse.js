import React from 'react';
import PropTypes from 'prop-types';

class QuestionnaireResponse extends React.Component {
  answers() {
    return this.props.answers.each((answer) => {
      return(
        <div>
          <h3 className='h5'>{answer.question}</h3>
          <p>{answer.value}</p>
        </div>
      );
    });
  }

  render() {
    return(
      <div className='response'>
        <h2 className='h3'>{this.props.person_name}</h2>
      </div>
    );
  }
}

QuestionnaireResponse.propTypes = {
  person_name: PropTypes.string,
  answers: PropTypes.object
};

export default QuestionnaireResponse;