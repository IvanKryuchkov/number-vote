import React from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Logs from './components/Logs';
import Main from './components/Main';

function App() {

  return (
    <div className="App">
      
      <nav>
        <div><Link to="/">Main</Link></div>
        <div><Link to="/logs">Logs</Link></div>
      </nav>

      <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/logs">
            <Logs/>
          </Route>
        </Switch>

    </div>
  );
}

export default App;
