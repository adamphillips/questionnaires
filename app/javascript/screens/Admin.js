import React from 'react';

import { Link } from 'react-router-dom';

import QuestionnaireList from '../components/QuestionnaireList';

const Admin = () => {
  return(
    <div>
      <h1>Questionnaire admin</h1>
      <p>
        <Link to="/add-questionnaire">Add new</Link>
      </p>

      <QuestionnaireList />
    </div>
  );
};

export default Admin;