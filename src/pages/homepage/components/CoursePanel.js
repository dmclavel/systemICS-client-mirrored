import React, { Component } from 'react';
import { Segment, Grid, Button, Header, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import { convertToGeneralTime } from './../../../utils/TimeUtilities';
import config from './../../../config.json';

const square = { width: 100, height: 100 };

class CoursePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: config.backendAddress,
			lecture: [],
			loading: true
		};
		autobind(this);
	}
	componentDidMount = () => {
		this.setState({ loading: true });
		const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		// listens on an endpoint and executes fallback function
		socket.emit('view_sections', {
			active: true,
			petitioned: true,
			additional: true,
			lectureOnly: true
		}); //send data to 'login' endpoint in server
		socket.on('view_sections', returnValueFromServer => {
			this.setState({ lecture: returnValueFromServer });
			this.setState({ loading: false });
		});
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
									<Link to={`/section/${item.course_offering_id}`}>
										<Button
											content="Learn More"
											basic
											onClick={() =>
												this.props.viewLabHandler(item.course_offering_id)
											}
										/>
									</Link>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
				))}
				<Link to="/classes">
					<Button basic content="View More" />
				</Link>
				<Loader active={this.state.loading} content="Loading..." />
			</div>
		);
	}
}

export default CoursePanel;
