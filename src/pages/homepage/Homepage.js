import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import NavbarHome from '../components/navbar/NavbarHome';
import HomepageHeader from '../components/headers/HomepageHeader';
import CoursePanel from './components/CoursePanel';

class Homepage extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<NavbarHome active='home' />
					<HomepageHeader />
				</Grid.Row>
				<Grid.Row centered>
					<CoursePanel/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Homepage;
