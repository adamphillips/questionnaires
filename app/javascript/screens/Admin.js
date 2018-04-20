import React from 'react';

import { Link } from 'react-router-dom';

const Admin = () => {
  return(
    <div>
      <Link to="/add-questionnaire">Add new</Link>
      <p>this is the admin area</p>
    </div>
  );
};

export default Admin;