import React from 'react';
import PropTypes from 'prop-types';

class QuestionnaireResponse extends React.Component {
  answersAsArray() {
    return Object.keys(this.props.answers).reduce((o, k) => {
      o.push(Object.assign({key: k}, this.props.answers[k]));
      return o;
    }, []);
  }

  answers() {
    return this.answersAsArray().map((answer) => {
      return(
        <div key={answer.key}>
          <h3 className='h5'>{answer.question}</h3>
          <p>{answer.answer}</p>
        </div>
      );
    });
  }

  render() {
    return(
      <div className='response'>
        <h2 className='h3'>
          {this.props.person_name}
        </h2>
        <p>Submitted {this.props.created_at}</p>
        {this.answers()}
      </div>
    );
  }
}

QuestionnaireResponse.propTypes = {
  person_name: PropTypes.string,
  created_at: PropTypes.string,
  answers: PropTypes.object
};

export default QuestionnaireResponse;