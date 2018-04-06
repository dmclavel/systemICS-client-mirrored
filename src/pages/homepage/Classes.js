import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Navbar from '../components/Navbar';
import CoursePanel from './components/CoursePanel';


class Classes extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<Navbar />
				</Grid.Row>
				<Grid.Row centered>
					<CoursePanel/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Classes;
