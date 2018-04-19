import React from 'react';

import { Link } from 'react-router-dom';

import QuestionnaireList from '../components/QuestionnaireList';

const Admin = () => {
  return(
    <div>
      <h1>Questionnaire admin</h1>
      <p>
        <Link to="/add-questionnaire" className='btn btn-primary btn-sm'>Add new</Link>
      </p>

      <p>Click on a questionnaire to view the responses</p>
      <QuestionnaireList />
    </div>
  );
};

export default Admin;