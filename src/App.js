import React, { Component } from 'react';
import './App.css';

import { Router } from 'react-router';
import autobind from 'react-autobind';
import { createBrowserHistory } from 'history';
import Routes from './pages/Routes';

const browserHistory = createBrowserHistory();

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      email: '',
      accessLvl: 3
    }
    autobind(this);
  }

  handleLogin(emailSrc, accessLvlSrc){
    this.setState({email: emailSrc, accessLvl: accessLvlSrc});
    console.log(this.state.email);
  }

  render() {
    return (
      <div className="App">
      	<Router history={browserHistory} >
          <Routes logInHanlder={this.handleLogin}  accessLvl={this.state.accessLvl}/>
      	</Router>

      </div>
    );
  }
}

export default App;
