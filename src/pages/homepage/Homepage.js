import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import NavbarHome from '../components/navbar/NavbarHome';
import HomepageHeader from '../components/headers/HomepageHeader';
import FacultyPanel from './components/FacultyPanel'
import CoursePanel from './components/CoursePanel';
import './Homepage.css';

class Homepage extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<NavbarHome active='home' />
					<HomepageHeader />
				</Grid.Row>
				<Grid.Row centered id="content">
					<CoursePanel viewLabHandler={this.props.viewLabHandler}/>
				</Grid.Row>
				<Grid.Row>
					<FacultyPanel />
				</Grid.Row>
			</Grid>
		);
	}
}

export default Homepage;
