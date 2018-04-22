import React from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => {
  return(
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} name={props.id} value={props.value} onChange={props.onChange} />
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
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


const exampleState = {
  title: 'Some questionnaire',
  questions: [
    { label: 'Hello' },
    { label: 'Goodbye' }
  ]
};

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = exampleState;
    this.addQuestion = this.addQuestion.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addQuestion() {
    let newState = {
      ...this.state
    };
    newState.questions.push({ label: '' });
    this.setState(newState);
  }

  questions() {
    let fields = [];
    for (let i=0; i < this.state.questions.length; i++) {
      let id = `question_${i + 1}`;
      let label = `Question ${i + 1}`;
      fields.push(
        <FormField
          key={i}
          id={id}
          label={label}
          value={this.state.questions[i].label}
          onChange={this.handleQuestionChange(i)}
        />
      );
    }
    return(fields);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleQuestionChange(index) {
    return (event) => {
      let newState = {
        ...this.state
      };
      newState.questions[index] = { label: event.target.value };
      this.setState(newState);
    };
  }

  handleSubmit(event) {
    console.log('form submitted');
  }

  render() {
    return (
      <form className="form">
        <FormField id="title" label="Title" value={this.state.title} onChange={this.handleTitleChange} />
        {this.questions()}
        <a className="addQuestionLink" href="#" onClick={this.addQuestion}>Add question</a>
        <FormButton label="Save" />
        <p>{JSON.stringify(this.state)}</p>
      </form>
    );
  }
}

export default QuestionnaireForm;