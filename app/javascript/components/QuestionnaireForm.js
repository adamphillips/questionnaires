import React from 'react';

import QuestionnaireQuestion from './QuestionnaireQuestion';
import FormField from './FormField';
import FormButton from './FormButton';

const defaultState = {
  isSaving: false,
  error: false,
  title: '',
  questions: [
    { label: '', name: '' }
  ]
};

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.addQuestion = this.addQuestion.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleQuestionNameChange = this.handleQuestionNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addQuestion(event) {
    let newState = {
      ...this.state
    };
    newState.questions.push({ label: '', name: '' });
    this.setState(newState);
    event.preventDefault();
  }

  questions() {
    let fields = [];
    for (let i=0; i < this.state.questions.length; i++) {
      fields.push(
        <QuestionnaireQuestion
          key={i}
          index={i}
          question={this.state.questions[i].label}
          questionName={this.state.questions[i].name}
          onQuestionNameChange={this.handleQuestionNameChange(i)}
          onQuestionChange={this.handleQuestionChange(i)}
          error={this.state.questions[i].error}
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
      return <div className="alert alert-danger">Errors with questionnaire. Please review and try again</div>;
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
      newState.questions[index]['label'] = event.target.value;
      this.setState(newState);
    };
  }

  handleQuestionNameChange(index) {
    return (event) => {
      let newState = {
        ...this.state
      };
      let newName = event.target.value;

      newState.questions[index]['name'] = newName;

      if (this.isQuestionNameTaken(newName, index)) {
        newState.questions[index]['error'] = `Duplicate question name ${newName}`;
      } else {
        delete newState.questions[index]['error'];
      }

      newState.error = this.hasAnyErrors();

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

  isQuestionNameTaken(name, index) {
    for(let i=0; i < this.state.questions.length; i++) {
      if (this.state.questions[i].name === name && i != index) {
        return true;
      }
    }
    return false;
  }

  hasAnyErrors() {
    for(let i=0; i < this.state.questions.length; i++) {
      if (this.state.questions[i].error) {
        return true;
      }
    }
    return false;
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
        <hr />
        <FormButton label="Save" disabled={this.state.error} />
      </form>
    );
  }
}

export default QuestionnaireForm;