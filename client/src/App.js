  
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Results from './components/Results/Results';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/results" exact component={Results}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;