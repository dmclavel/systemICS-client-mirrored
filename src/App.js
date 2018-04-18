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
      accessLvl: 0,
      profile: null
    }

    autobind(this);
  }

  handleLogin = (profileSrc, accessLvl) => {
    const emailSrc = profileSrc.U3;
    const accessLvlSrc = accessLvl;
    this.setState({email: emailSrc, accessLvl: accessLvlSrc, profile:profileSrc});
    localStorage.setItem(loginCacheName, JSON.stringify(this.state));
  }

  handleLogOut = () => {
    console.log("Logging out...");
    localStorage.setItem(loginCacheName, null);
  }

  componentDidMount(){
    // check if local storage has log-in session
    const cachedLogIn = localStorage.getItem(loginCacheName);
    if (cachedLogIn != null && cachedLogIn.localeCompare("null") !== 0){
      console.log("load saved session" + cachedLogIn);
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
          <Routes logInHandler={this.handleLogin} accessLvl={this.state.accessLvl} user={this.state.profile}/>
      	</Router>
      </div>
    );
  }
}

export default App;
