import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Navbar from '../components/Navbar';
import CoursePanelWhole from './components/CoursePanelWhole';


class Classes extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<Navbar />
				</Grid.Row>
				<Grid.Row centered>
					<CoursePanelWhole/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Classes;
