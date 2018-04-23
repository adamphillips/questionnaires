import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import QuestionnaireResponses from '../components/QuestionnaireResponses';

const ViewQuestionnaire = (props) => {
  return(
    <div>
      <Link to='/'>Back to home</Link>
      <QuestionnaireResponses id={Number(props.match.params.id)} />
    </div>
  );
};

ViewQuestionnaire.propTypes = {
  match: PropTypes.object
};

export default ViewQuestionnaire;