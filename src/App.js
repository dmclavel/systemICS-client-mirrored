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
      accessLvl: 3,
      profile: null
    }
    autobind(this);
  }

  handleLogin = (profileSrc) => {
    const emailSrc = profileSrc.U3;
    const accessLvlSrc = 3;
    this.setState({email: emailSrc, accessLvl: accessLvlSrc, profile:profileSrc});

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
      <div className="App">
      	<Router history={browserHistory} >
          <Routes logInHanlder={this.handleLogin}  accessLvl={this.state.accessLvl}/>
      	</Router>

      </div>
    );
  }
}

export default App;
