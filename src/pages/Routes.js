/*
Author: Gaza, John Cedric C.
File: Basic routing system.
*/

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { GoogleAPI, GoogleLogin } from 'react-google-oauth';
import socketIOClient from 'socket.io-client';

import CoursesTab from './Homepage/CoursesTab';
import FacultyTab from './Homepage/FacultyTab';
import Login from './Homepage/Login';
import Admin from './Admin/Admin';
import RegCom from './RegCom/RegCom';
import Faculty from './Faculty/Faculty';
import Section from './Homepage/Section';

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
	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/courses' component={ CoursesTab } securityLevel={0}/>
					<Route exact path='/login' component={ Login } securityLevel={0}/>
					<PrivateRoute exact path='/faculty' component={ FacultyTab } securityLevel={1}/>
					<PrivateRoute exact path='/admin/home' component={ Admin } securityLevel={3}/>
					<PrivateRoute exact path='/regcom/home' component={ RegCom } securityLevel={2}/>
					<PrivateRoute exact path='/faculty/home' component={ Faculty } securityLevel={1}/>
					<PrivateRoute exact path='/section' component={ Section } securityLevel={1}/>
				</Switch>
			</main>
		)
	}
}

export default Routes;
