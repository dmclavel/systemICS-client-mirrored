/*
Author: Gaza, John Cedric C.
File: Basic routing system.
*/

import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router';
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
import Section from './homepage/Section';
import NotFound from './components/NotFound';
import Users from './admin/users/Users';
import GeneratePDF from './generate-pdf/GeneratePDF';
import autobind from 'react-autobind';

const authenticator = {
	user: 3,
	// level of user
	// 0: general
	// 1: faculty
	// 2: regcom
	// 3: Admin

	authenticate(cb) {
		this.isAuthenticated = 1;
		setTimeout(cb, 100); // fake async
	},

	signout(cb) {
		this.isAuthenticated = 0;
		setTimeout(cb, 100); // fake async
	}
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authenticator.user >= rest.securityLevel ? (
				<Component {...props} />
			) : (
				<Redirect to="/login" />
			)
		}
	/>
);

class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: {},
			labSection: 0
		};
		autobind(this);
	}

	handleViewLabs = section => {
		this.setState({ labSection: section });
	};

	render() {
		// non-user
		if (this.props.accessLvl === 0)
			return (
				<Switch>
					<Route
						exact
						path="/"
						component={() => <Homepage viewLabHandler={this.handleViewLabs} />}
					/>
					<Route exact path="/faculty" component={FacultyTab} />
					<Route
						exact
						path="/login"
						component={() => <Login logInHandler={this.props.logInHandler} />}
					/>
					<Route
						exact
						path="/classes"
						component={() => <Classes viewLabHandler={this.handleViewLabs} />}
					/>
					<Route exact path="/section/:_id" component={Section} />
					<Route path="*" component={NotFound} />
				</Switch>
			);
		// faculty
		else if (this.props.accessLvl === 1)
			return (
				<Switch>
					<Redirect exact from="/" to="/faculty/dashboard" />
					<Route
						exact
						path="/faculty/dashboard"
						component={() => (
							<Faculty
								accessLvl={this.props.accessLvl}
								user={this.props.user}
							/>
						)}
					/>
					<Route path="*" component={NotFound} />
				</Switch>
			);
		// regcom
		else if (this.props.accessLvl === 2)
			return (
				<Switch>
					<Redirect exact from="/" to="/regcom/dashboard" />
					<Route
						exact
						path="/regcom/dashboard"
						component={() => (
							<Faculty
								accessLvl={this.props.accessLvl}
								user={this.props.user}
							/>
						)}
					/>
					<Route
						exact
						path="/regcom/manage/advisees"
						component={() => (
							<Advisees
								accessLvl={this.props.accessLvl}
								user={this.props.user}
							/>
						)}
					/>
					<Route
						exact
						path="/regcom/manage/teaching"
						component={() => (
							<RegCom accessLvl={this.props.accessLvl} user={this.props.user} />
						)}
					/>
					<Route path="*" component={NotFound} />
				</Switch>
			);
		// ADMIN
		else if (this.props.accessLvl === 3)
			return (
				<Switch>
					<Redirect exact from="/" to="/admin/dashboard" />
					<Route
						exact
						path="/admin/dashboard"
						component={() => (
							<Faculty
								accessLvl={this.props.accessLvl}
								user={this.props.user}
							/>
						)}
					/>
					<Route
						exact
						path="/admin/manage/courses"
						component={() => (
							<Admin accessLvl={this.props.accessLvl} user={this.props.user} />
						)}
					/>
					<Route
						exact
						path="/admin/manage/advisees"
						component={() => (
							<Advisees
								accessLvl={this.props.accessLvl}
								user={this.props.user}
							/>
						)}
					/>
					<Route
						exact
						path="/admin/manage/teaching"
						component={() => (
							<RegCom accessLvl={this.props.accessLvl} user={this.props.user} />
						)}
					/>
					<Route
						exact
						path="/admin/manage/users"
						component={() => (
							<Users accessLvl={this.props.accessLvl} user={this.props.user} />
						)}
					/>

					<Route exact path="/admin/generate_report" component={GeneratePDF} />
					<Route path="*" component={NotFound} />
				</Switch>
			);

		// everything else, return not found
		return <Route path="*" component={NotFound} />;
	}
}

export default withRouter(Routes);
