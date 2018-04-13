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
import Advisees from './advisees/Advisees';
import RegCom from './regcom/RegCom';
import SectionTab from './homepage/SectionTab';
import NotFound from './components/NotFound';
import Users from './admin/users/Users';

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
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/' component={ Homepage } securityLevel={0}/>
					<Route exact path='/faculty' component={ FacultyTab } securityLevel={0}/>
					<Route exact path='/login' component={ () => <Login logInHandler={this.props.logInHandler} /> } securityLevel={0}/>

					<PrivateRoute exact path='/admin/dashboard' component={ () => <Faculty user='admin' /> } securityLevel={3}/>
					<PrivateRoute exact path='/admin/manage/courses' component={ () => <Admin user='admin' />  } securityLevel={3}/>
					<PrivateRoute exact path='/admin/manage/advisees' component={ () => <Advisees user='admin' />  } securityLevel={3}/>
					<PrivateRoute exact path='/admin/manage/teaching' component={ () => <RegCom user='admin' />  } securityLevel={3}/>
					<PrivateRoute exact path='/admin/manage/users' component={ () => <Users user='admin' />  } securityLevel={3}/>

					<PrivateRoute exact path='/regcom/dashboard' component={ () => <Faculty user='regcom' /> } securityLevel={3}/>
					<PrivateRoute exact path='/regcom/manage/advisees' component={ () => <Advisees user='regcom' /> } securityLevel={3}/>
					<PrivateRoute exact path='/regcom/manage/teaching' component={ () => <RegCom user='regcom' />  } securityLevel={3}/>
					<PrivateRoute exact path='/dashboard' component={ Faculty } securityLevel={3}/>

					<PrivateRoute exact path='/section/:_id' component={ SectionTab } securityLevel={1}/>
					<PrivateRoute exact path='/classes' component={ Classes } securityLevel={1}/>

					<Route path="*" component={ NotFound } />
				</Switch>
			</main>
		)
	}
}

export default Routes;
