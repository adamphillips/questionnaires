import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Admin from '../screens/Admin';
import AddQuestionnaire from '../screens/AddQuestionnaire';
import ViewQuestionnaire from '../screens/ViewQuestionnaire';

const App = () => {
  return(
    <Router basename="/admin">
      <div>
        <Route exact path="/" component={Admin} />
        <Route path="/add-questionnaire" component={AddQuestionnaire} />
        <Route path="/questionnaires/:id" component={ViewQuestionnaire} />
      </div>
    </Router>
  );
};

export default App;