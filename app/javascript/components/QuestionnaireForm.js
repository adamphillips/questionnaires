import React from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => {
  return(
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} name={props.id} value={props.value} />
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string
};

const FormButton = (props) => {
  return(
    <div>
      <button>{props.label}</button>
    </div>
  );
};

FormButton.propTypes = {
  label: PropTypes.string,
};

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfQuestions: 1
    };
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    this.setState({
      numberOfQuestions: this.state.numberOfQuestions + 1
    });
  }

  questions() {
    let questions = [];
    for (let i=1; i <= this.state.numberOfQuestions; i++) {
      let id = `question_${i}`;
      let label = `Question ${i}`;
      questions.push(<FormField key={i} id={id} label={label} />);
    }
    return(questions);
  }

  render() {
    return (
      <form className="form">
        <FormField id="name" label="Name" />
        {this.questions()}
        <a href="#" onClick={this.addQuestion}>Add question</a>
        <FormButton label="Save" />
      </form>
    );
  }
}

export default QuestionnaireForm;