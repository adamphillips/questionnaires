import React from 'react';

import { Link } from 'react-router-dom';

class QuestionnaireList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questionnaires: []
    };
  }

  componentDidMount() {
    fetch('/api/questionnaires', {})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            questionnaires: result.questionnaires
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  questionnaires() {
    return this.state.questionnaires.map((questionnaire) => {
      return(
        <p key={questionnaire.id}>
          <Link to={`/questionnaires/${questionnaire.id}`}>{questionnaire.title}</Link>
        </p>
      );
    });
  }

  render() {
    return(
      <div>
        {this.questionnaires()}
      </div>
    );
  }
}

export default QuestionnaireList;