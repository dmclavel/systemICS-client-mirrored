import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Navbar from '../components/Navbar';
import Heading from '../components/Heading';
import CoursePanel from './components/CoursePanel';
import Section from './Section';

class SectionTab extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<Navbar />
					<Heading />
				</Grid.Row>
				<Grid.Row centered>
					<Section/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default SectionTab;
