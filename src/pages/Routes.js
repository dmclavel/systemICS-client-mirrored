/*
Author: Gaza, John Cedric C.
File: Basic routing system.
*/

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { GoogleAPI, GoogleLogin } from 'react-google-oauth';
import socketIOClient from 'socket.io-client';

import Homepage from './homepage/Homepage';
import Classes from './homepage/Classes';
import FacultyTab from './homepage/FacultyTab';
import Login from './login/Login';
import Faculty from './faculty/Faculty';
import Admin from './admin/Admin';
import RegCom from './regcom/RegCom';
import SectionTab from './homepage/SectionTab';



const authenticator = {
  user: 3,
	// level of user
	// 0: general
	// 1: faculty
	// 2: regcom
	// 3: Admin

	authenticate(cb) {
    this.isAuthenticated = 1
    setTimeout(cb, 100) // fake async
  },

  signout(cb) {
    this.isAuthenticated = 0
    setTimeout(cb, 100) // fake async
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
	    authenticator.user >= rest.securityLevel
	      ? <Component {...props} />
	      : <Redirect to='/login' />
	  )} />
);


class Routes extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    authenticator.user = this.props.accessLvl;
    console.log("accessLvl: " + authenticator.user);
  }

  render() {
		return (
			<main>
				<Switch>
					<Route exact path='/' component={ Homepage } securityLevel={0}/>
					<Route exact path='/faculty' component={ FacultyTab } securityLevel={0}/>
					<Route exact path='/login' component={ () => <Login logInHanlder={this.props.logInHanlder}/> } securityLevel={0} />
					{/*<PrivateRoute exact path='/faculty' component={ FacultyTab } securityLevel={1}/>*/}
					<PrivateRoute exact path='/admin/home' component={ Admin } securityLevel={3}/>
					<PrivateRoute exact path='/regcom/home' component={ RegCom } securityLevel={3}/>
					<PrivateRoute exact path='/dashboard' component={ Faculty } securityLevel={3}/>
					{/*<PrivateRoute exact path='/regcom/home' component={ RegCom } securityLevel={2}/>
					<PrivateRoute exact path='/faculty/home' component={ Faculty } securityLevel={1}/>*/}
					<PrivateRoute exact path='/section/:_id' component={ SectionTab } securityLevel={1}/>
					<PrivateRoute exact path='/classes' component={ Classes } securityLevel={1}/>
				</Switch>
			</main>
		)
	}
}

export default Routes;
