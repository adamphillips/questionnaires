import React from 'react';

import { Link } from 'react-router-dom';

import QuestionnaireList from '../components/QuestionnaireList';

const Admin = () => {
  return(
    <div>
      <Link to="/add-questionnaire">Add new</Link>
      <QuestionnaireList />
    </div>
  );
};

export default Admin;