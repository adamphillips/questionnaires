import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Admin from '../screens/Admin';
import AddQuestionnaire from '../screens/AddQuestionnaire';

const App = () => {
  return(
    <Router basename="/admin">
      <div>
        <Route exact path="/" component={Admin} />
        <Route path="/add-questionnaire" component={AddQuestionnaire} />
      </div>
    </Router>
  );
};

export default App;