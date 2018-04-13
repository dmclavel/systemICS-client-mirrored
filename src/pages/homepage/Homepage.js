import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Navbar from '../components/Navbar';
import Heading from '../components/Heading';
import Footer from '../components/Footer';
import CoursePanel from './components/CoursePanel';
import './Homepage.css';


class Homepage extends Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<Navbar />
					<Heading />
				</Grid.Row>
				<Grid.Row centered id="content">
					<CoursePanel/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Homepage;
