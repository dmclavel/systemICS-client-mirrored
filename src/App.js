import React, { Component } from 'react';
import './App.css';

import { Router } from 'react-router';
import autobind from 'react-autobind';
import { createBrowserHistory } from 'history';
import Routes from './pages/Routes';

const browserHistory = createBrowserHistory();

const loginCacheName = 'login';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      email: '',
      accessLvl: 3
    }
    autobind(this);
  }

  handleLogin = (emailSrc, accessLvlSrc) => {
    this.setState({email: emailSrc, accessLvl: accessLvlSrc});
    localStorage.setItem(loginCacheName, JSON.stringify(this.state));
  }
  handleLogOut = () => {
    localStorage.setItem(loginCacheName, null);
  }
  componentDidMount(){
    // check if local storage has log-in session
    const cachedLogIn = localStorage.getItem(loginCacheName);
    if(cachedLogIn){
      console.log("load saved sesion" + cachedLogIn);
      const session = JSON.parse(cachedLogIn);
      this.setState(session);
      // console.log(JSON.parse(cachedLogIn));
    }
  }
  render() {
    console.log(this.state);
    return (
      <div className="App bg-color-main">
      	<Router history={browserHistory} >
          <Routes logInHanlder={this.handleLogin}  accessLvl={this.state.accessLvl}/>
      	</Router>

      </div>
    );
  }
}

export default App;
