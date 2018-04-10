import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Navbar from '../components/Navbar';
import Heading from '../components/Heading';
import CoursePanel from './components/CoursePanel';


class Homepage extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<Navbar />
					<Heading />
				</Grid.Row>
				<Grid.Row centered>
					<CoursePanel/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Homepage;
