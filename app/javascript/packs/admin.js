import React from 'react';
import ReactDOM from 'react-dom';

import Admin from '../apps/admin';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Admin />,
    document.getElementById('admin-app')
  );
});