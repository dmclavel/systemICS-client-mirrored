import React, { Component } from 'react';
import {
	Button,
	Modal,
	Form,
	Grid,
	Segment,
	Header,
	Container,
	Message
} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import ViewCourses from './ViewCourses';

const inlineStyle = {
	modal: {
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'
	}
};

class AddCourseModal extends Component {
	constructor() {
		super();

		this.state = {
			open: false,
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			coursesX: [],
			courses: [],
			course_name: '',
			course_title: '',
			description: '',
			uniqueCourse: true,
			error: '',
			message: '',
			warning: false
		};
		autobind(this);
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value, message: '' });
	};

	handleSubmit = evt => {
		const { course_name, course_title, description } = this.state;

		if (
			this.state.course_name === '' ||
			this.state.course_title === '' ||
			this.state.description === ''
		) {
			this.setState({ error: 'Please fill all the fields!' });
		} else {
			this.setState({ error: '' });
			const socket = socketIOClient(this.state.address);
			const data = {
				email: 'pvgrubat@up.edu.ph',
				course_name: course_name,
				course_title: course_title,
				description: description
			};

			socket.emit('view_existing_courses', data);
			socket.on('view_existing_courses', course => {
				//Check if inputted course is not yet in the database
				const result = course.find(res => res.course_name === course_name);
				if (!result) {
					socket.emit('create_course', data); //if course not in database, proceed to creating a new course
					this.setState({
						message: `${course_name} has been successfully added!`,
						warning: false
					});
				} else {
					this.setState({
						message: `${course_name} already exists.`,
						warning: true
					}); //else, prompt error
				}
			});
		}
	};

	open = () => {
		this.setState({
			open: true
		});
	};

	close = () =>
		this.setState({
			open: false,
			course_title: '',
			course_name: '',
			description: ''
		});

	render() {
		const {
			course_name,
			open,
			course_title,
			description,
			message,
			warning
		} = this.state;

		return (
			<Modal
				size="large"
				style={inlineStyle.modal}
				onClose={this.close}
				onOpen={this.open}
				open={open}
				trigger={
					<Button floated="right" positive content="View Existing Courses" />
				}
				basic
			>
				<Modal.Content>
					<Container>
						<Segment padded="very">
							<Grid>
								<Grid.Row>
									<Header as="h2">Add Course </Header>
								</Grid.Row>
								<Grid.Row>
									<Grid.Column width={16}>
										<Form>
											<Form.Group>
												<Form.Input
													width={3}
													label="Course Name"
													placeholder="Course Name"
													name="course_name"
													value={course_name}
													onChange={this.handleChange}
													required
												/>
												<Form.Input
													width={3}
													label="Course Title"
													placeholder="Course Title"
													name="course_title"
													value={course_title}
													onChange={this.handleChange}
													required
												/>
												<Form.Input
													width={8}
													label="Course Description"
													placeholder="Course Description"
													name="description"
													value={description}
													onChange={this.handleChange}
													required
												/>
												<Form.Button
													className="form-button"
													width={2}
													positive
													onClick={this.handleSubmit}
												>
													{' '}
													Submit
												</Form.Button>
											</Form.Group>
										</Form>
									</Grid.Column>
								</Grid.Row>

								<Grid.Row>
									{message && (
										<Grid.Column width={16}>
											<Message
												warning={warning}
												success={!warning}
												header={message}
												icon={warning ? 'remove' : 'checkmark'}
											/>
										</Grid.Column>
									)}
								</Grid.Row>

								<Grid.Row>
									<Grid.Column width={16}>
										<ViewCourses />
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Segment>
					</Container>
				</Modal.Content>
			</Modal>
		);
	}
}

export default AddCourseModal;
