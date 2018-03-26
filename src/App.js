import React, { Component } from 'react';
import './App.css';

import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Routes from './pages/Routes';

const browserHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Router history={browserHistory}>
          <Routes />
      	</Router>

      </div>
    );
  }
}

export default App;
