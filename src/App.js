import React, { Component } from 'react';
import './App.css';

import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Routes from './pages/Routes';
import Navbar from './pages/TestingFolder/Navbar';
import Heading from './pages/TestingFolder/Heading';
import Course from './pages/TestingFolder/Course';

const browserHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Router history={browserHistory}>
      		<div>
	      		<Navbar />
	      		<Heading />
	      		<Course />
      		</div>
      	</Router>
      </div>
    );
  }
}

export default App;
