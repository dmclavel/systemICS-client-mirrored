/*
Author: Gaza, John Cedric C.
File: Basic routing system.
*/

import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import CoursesTab from './Homepage/CoursesTab';
import FacultyTab from './Homepage/FacultyTab';
import Login from './Homepage/Login';
import Admin from './Admin/Admin';
import RegCom from './RegCom/RegCom';
import Faculty from './Faculty/Faculty';

class Routes extends Component {
	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/courses' component={ CoursesTab } />
					<Route exact path='/login' component={ Login } />
					<Route exact path='/faculty' component={ FacultyTab } />
					<Route exact path='/admin/home' component={ Admin } />
					<Route exact path='/regcom/home' component={ RegCom } />
					<Route exact path='/faculty/home' component={ Faculty } />
				</Switch>
			</main>
		)
	}
}

export default Routes;
