import React from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';

const QuestionnaireQuestion = (props) => {
  let question_id = `question_${props.index + 1}`;
  let question_name_id = `question_name_${props.index + 1}`;

  return(
    <div>
      <h2>Question {props.index + 1}</h2>

      <div className='form-row'>
        <div className='col-md'>
          <FormField
            id={question_name_id}
            label='Name'
            name={question_name_id}
            value={props.questionName}
            onChange={props.onQuestionNameChange}
            error={props.error}
          />
        </div>
        <div className='col-md'>
          <FormField
            id={question_id}
            label='Question'
            name={question_id}
            value={props.question}
            onChange={props.onQuestionChange}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

QuestionnaireQuestion.propTypes = {
  index: PropTypes.number,
  question: PropTypes.string,
  questionName: PropTypes.string,
  onQuestionChange: PropTypes.func,
  onQuestionNameChange: PropTypes.func,
  error: PropTypes.string
};

export default QuestionnaireQuestion;