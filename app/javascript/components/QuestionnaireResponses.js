import React from 'react';

import PropTypes from 'prop-types';

import QuestionnaireResponse from './QuestionnaireResponse';

class QuestionnaireResponses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questionnaire: null,
      currentResponse: null
    };
    this.responseLinkHandler = this.responseLinkHandler.bind(this);
  }

  componentDidMount() {
    fetch(`/api/questionnaires/${this.props.id}`, {})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            questionnaire: result
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

  responseLinks() {
    return(
      this.state.questionnaire.questionnaire_responses.map((response, index) => {
        return <a
          key={index}
          className='response-link'
          href='#'
          onClick={this.responseLinkHandler(response)}
        >
          {response.person_name}
        </a>;
      })
    );
  }

  responseLinkHandler(response) {
    return (event) => {
      this.setCurrentResponse(response);
      event.preventDefault();
    };
  }

  setCurrentResponse(response) {
    this.setState({
      currentResponse: response
    });
  }

  response() {
    const currentResponse = this.state.currentResponse;

    if (!currentResponse) {
      return;
    }

    return(
      <QuestionnaireResponse person_name={currentResponse.person_name} answers={currentResponse.answers} />
    );
  }

  render() {
    const { error, isLoaded, questionnaire } = this.state;

    if (error) {
      return <p>Error loading questionnaire</p>;
    }
    if (!isLoaded) {
      return <p>Loading...</p>;
    }

    return(
      <div>
        <h1>{questionnaire.title}</h1>
        <div className="row">
          <div className='col-3'>
            {this.responseLinks()}
          </div>
          <div className='col-9'>
            {this.response()}
          </div>
        </div>
      </div>
    );
  }
}

QuestionnaireResponses.propTypes = {
  id: PropTypes.number
};

export default QuestionnaireResponses;