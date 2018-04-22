import React, { Component } from 'react';
import { Segment, Grid, Button, Header } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import { convertToGeneralTime } from './../../../utils/TimeUtilities';

const square = { width: 100, height: 100 };

class CoursePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: 'https://sleepy-falls-95372.herokuapp.com/',
			lecture: [
				{
					course_offering: '',
					time_start: '',
					time_end: '',
					room: '',
					day: '',
					section: '',
					section_type: 0,
					course_name: '',
					course_title: '',
					description: '',
					name: ''
				}
			]
		};
		autobind(this);
	}
	componentDidMount = () => {
		const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		// listens on an endpoint and executes fallback function
		socket.emit('view_all_lecture_sections', 'dfesperanza@up.edu.ph'); //send data to 'login' endpoint in server
		socket.on('view_all_lecture_sections', returnValueFromServer => {
			console.log(returnValueFromServer);
			this.setState({ lecture: returnValueFromServer });
		});
	};
	//a function for sending data to server.you can have many of these
	sendData = () => {
		const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		socket.emit('login', 'this is my data'); //send data to 'login' endpoint in server
	};
	render() {
		return (
			<div className="courses">
				{/* Hi, in the future, make it as another component */
				this.state.lecture.slice(0, 3).map((item, index) => (
					<Segment fluid id={item.course_name}>
						<Grid divided>
							<Grid.Row>
								<Grid.Column width={3}>
									<Segment inverted circular style={square} />
								</Grid.Column>
								<Grid.Column width={10}>
									<Header textAlign="left">
										<Header.Content>
											{item.course_name} ( {item.section} ) |{' '}
											{item.course_title}
										</Header.Content>
										<Header.Subheader>{item.description}</Header.Subheader>
									</Header>
									<Grid divided>
										<Grid.Row>
											<Grid.Column width={5}>
												<Header
													textAlign="left"
													size="small"
													icon="user"
													content={item.name}
													subheader={item.profroom}
												/>
											</Grid.Column>
											<Grid.Column width={6}>
												<Header
													textAlign="left"
													size="small"
													icon="marker"
													content={item.room}
												/>
											</Grid.Column>
											<Grid.Column width={5}>
												<Header
													textAlign="left"
													size="small"
													icon="clock"
													subheader={item.day}
												/>
												{convertToGeneralTime(item.time_start)}-{convertToGeneralTime(
													item.time_end
												)}
											</Grid.Column>
										</Grid.Row>
									</Grid>
								</Grid.Column>
								<Grid.Column width={3} verticalAlign="middle">
									<Button
										content="Learn More"
										basic
										onClick={() => {
											this.props.viewLabHandler(item.course_offering_id);
											window.location =
												'/section/' + item.course_offering_id;
										}}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
				))}
				<Button
					basic
					content="View More"
					onClick={() => {
						window.location = '/classes';
					}}
				/>
			</div>
		);
	}
}

export default CoursePanel;
