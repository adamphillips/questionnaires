import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import store from '../app/store';

import Admin from '../screens/Admin';
import AddQuestionnaire from '../screens/AddQuestionnaire';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router basename="/admin">
        <div>
          <Route exact path="/" component={Admin} />
          <Route path="/add-questionnaire" component={AddQuestionnaire} />
        </div>
      </Router>
    </Provider>,
    document.getElementById('admin-app')
  );
});