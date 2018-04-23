import React from 'react';

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

export default ViewQuestionnaire;