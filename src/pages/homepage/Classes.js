import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import NavbarHome from '../components/navbar/NavbarHome';
import CoursePanelWhole from './components/CoursePanelWhole';
import ClassesHeader from '../components/headers/ClassesHeader'

class Classes extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<NavbarHome active='classes' />
					<ClassesHeader />
				</Grid.Row>
				<Grid.Row centered>
					<CoursePanelWhole/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Classes;
