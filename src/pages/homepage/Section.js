/*
AUTHOR: Gotis, Ciara Mae
		Esperanza, Dannah
FILE: FacultyTab, to be used for basic JS pages in the system.

BASIC TEMPLATE FOR ALL JS PAGES
DO NOT FORGET TO DOCUMENT YOUR OWN CODE.
Change name FacultyTab to the name of file.
This will be updated for mapping, grid layouting, etc.
Write the Author of the code at the top of the document.
*/
import { Grid, Container, Card, Button } from 'semantic-ui-react';
import React, { Component } from 'react';
import autobind from 'react-autobind';
import SectionCard from './SectionCard';
import NavbarHome from '../components/navbar/NavbarHome';
import SectionHeader from '../components/headers/SectionHeader';
import socketIOClient from 'socket.io-client';
import './Section.css';
/*
If you wish to import other JS files, do it here.
*/

class Section extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: 'https://sleepy-falls-95372.herokuapp.com/', // the address of the server
			lab: [
				{
					time_start: '',
					time_end: '',
					room: '',
					day: '',
					section: '',
					course_name: '',
					course_title: '',
					name: ''
				}
			]
		};
		autobind(this);
	}

	// what to do once the page (re)loads
	componentDidMount = () => {
		const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		// listens on an endpoint and executes fallback function

		socket.emit('view_sections', {
			active: true,
			petitioned: false,
			additional: false,
			unassignedOnly: false
		}); //send data to 'login' endpoint in server
		socket.on('view_sections', returnValueFromServer => {
			console.log(returnValueFromServer);
			this.setState({ lab: returnValueFromServer });
		});
	};
	//a function for sending data to server.you can have many of these
	sendData = () => {
		const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		socket.emit('login', 'this is my data'); //send data to 'login' endpoint in server
	};
	render() {
		const { lab } = this.state;

		const currentLab = lab.filter(result => {
			return result.course_name
				.replace(' ', '')
				.includes(this.props.match.params._id);
		});

		return (
			<div className="LabSectionTab">
				<Grid centered={true}>
					<Grid.Row>
						<NavbarHome active="classes" />
						<SectionHeader />
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16} textAlign="center">
							<Grid columns={4} divided centered>
								<Container centered>
									<Card.Group itemsPerRow={4}>
										{currentLab.map((item, index) => (
											<div>
												<SectionCard
													name={item['name']}
													course_name={item['course_name']}
													section={item['section']}
													day={item['day']}
													timestart={item['time_start']}
													timeend={item['time_end']}
													room={item['room']}
												/>
											</div>
										))}
									</Card.Group>
								</Container>
							</Grid>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Button
							basic
							textAlign="center"
							onClick={() => {
								window.location = '/';
							}}
						>
							Back
						</Button>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default Section;
