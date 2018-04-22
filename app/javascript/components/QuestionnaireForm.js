import React from 'react';

import FormField from './FormField';
import FormButton from './FormButton';

const exampleState = {
  isSaving: false,
  error: false,
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

  message() {
    if (this.state.isSaving) {
      return <div className="alert alert-info">Saving...</div>;
    }

    if (this.state.success) {
      return <div className="alert alert-info">{this.state.success}</div>;
    }

    if (this.state.error) {
      return <div className="alert alert-danger">There was an error</div>;
    }
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

  questionnaireData() {
    return {
      questionnaire: {
        title: this.state.title,
        questions:this.state.questions
      }
    };
  }

  csrfToken() {
    let result;
    try{
      result = document.querySelectorAll('meta[name=csrf-token]')[0].getAttribute('content');
    } catch(error) {
      result = 'no-csrf-token-found';
    }
    return result;
  }

  handleSubmit(event) {
    this.setState({
      success: false,
      error: false,
      isSaving: true
    });

    fetch('/api/questionnaires', {
      method: 'POST',
      body: JSON.stringify(this.questionnaireData()),
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': this.csrfToken()
      }),
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isSaving: false,
            success: result.result.message,
            id: result.record.id
          });
        },
        (error) => {
          this.setState({
            isSaving: false,
            error: true
          });
        }
      );

    event.preventDefault();
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {this.message()}
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