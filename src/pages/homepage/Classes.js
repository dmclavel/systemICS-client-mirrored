import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import NavbarHome from '../components/navbar/NavbarHome';
import CoursePanelWhole from './components/CoursePanelWhole';
import ClassesHeader from '../components/headers/ClassesHeader';

class Classes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
	}

	updateSearch = search => {
		this.setState({ search: search });
	};

	render() {
		const { search } = this.state;
		return (
			<Grid>
				<Grid.Row>
					<NavbarHome active="classes" />
					<ClassesHeader search={search} updateSearch={this.updateSearch} />
				</Grid.Row>
				<Grid.Row centered>
					<CoursePanelWhole search={search} updateSearch={this.updateSearch} />
				</Grid.Row>
			</Grid>
		);
	}
}

export default Classes;
