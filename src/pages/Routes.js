/*
Author: Gaza, John Cedric C.
File: Basic routing system.
*/

import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Courses from './Homepage/Courses';
import Login from './Homepage/Login';
import Admin from './Admin/Admin';
import RegCom from './RegCom/RegCom';

class Routes extends Component {
	render() {
		return (
			<main>
				<Switch>
					<Route path='/courses' component={ Courses } />
					<Route path='/login' component={ Login } />
					<Route path='/admin/home' component={ Admin } />
					<Route path='/regcom/home' component={ RegCom } />
				</Switch>
			</main>
		)
	}
}

export default Routes;