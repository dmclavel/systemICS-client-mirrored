import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import NavbarHome from '../components/navbar/NavbarHome';
import CoursePanelWhole from './components/CoursePanelWhole';

class Classes extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<NavbarHome active='classes' />
				</Grid.Row>
				<Grid.Row centered>
					<CoursePanelWhole/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Classes;
