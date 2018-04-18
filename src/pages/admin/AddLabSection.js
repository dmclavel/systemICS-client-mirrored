import React, { Component } from 'react';
import {
	Button,
	Modal,
	Form,
	Grid,
	Segment,
	Header,
	Container
} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

const inlineStyle = {
	modal: {
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'
	}
};
class AddCourseLab extends Component {
	constructor() {
		super();

		this.state = {
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			error: '',
			M: false,
			T: false,
			W: false,
			Th: false,
			F: false,
			coursesX: [],
			courses: [],
			course_offering_id: '',
			emp_no: '',
			acad_year: '',
			semester: '',
			no_of_students: '',
			course_id: '',
			course_name: '',
			time_start: '',
			time_end: '',
			room: '',
			day: '',
			section: '',
			unit: '',
			max_capacity: '',
			status: '',
			course_title: '',
			description: ''
		};
		autobind(this);
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	};

	dayFormat() {
		const { M, T, W, Th, F } = this.state;
		let days = '';
		if (M) {
			if (days === '') {
				days = 'M';
				this.setState({ day: 'M' });
			}
		}
		if (T) {
			if (days === '') {
				days = 'T';
				this.setState({ day: 'T' });
			} else days = days + '-T';
		}
		if (W) {
			if (days === '') {
				days = 'W';
				this.setState({ day: 'W' });
			} else days = days + '-W';
		}
		if (Th) {
			if (days === '') {
				days = 'Th';
				this.setState({ day: 'Th' });
			} else days = days + '-Th';
		}
		if (F) {
			if (days === '') {
				days = 'F';
				this.setState({ day: 'F' });
			} else days = days + '-F';
		}
		return days;
	}

	handleChange = (e, { name, value }) => {
		this.setState({ [name]: value });
	};

	handleDayChange = (e, { content, active }) => {
		if (active === true) this.setState({ [content]: false });
		else if (active === false) this.setState({ [content]: true });
	};

	handleSubmit = () => {
		let days = this.dayFormat();
		let id = this.props.courseLecID;
		const {
			course_offering_id,
			acad_year,
			semester,
			no_of_students,
			time_start,
			time_end,
			room,
			section,
			unit,
			max_capacity
		} = this.state;

		const socket = socketIOClient(this.state.address);

		const data = {
			email: 'pvgrubat@up.edu.ph',
			acad_year: acad_year,
			semester: semester,
			time_start: time_start,
			time_end: time_end,
			room: room,
			no_of_students: no_of_students,
			unit: unit,
			day: days,
			section: section,
			max_capacity: max_capacity,
			course_id: id,
			emp_no: null,
			status: 'Pending'
		};
		this.setState({ error: '' });
		if (
			section === '' ||
			room === '' ||
			time_start === '' ||
			time_end === '' ||
			unit === '' ||
			acad_year === '' ||
			semester === '' ||
			max_capacity === ''
		) {
			this.setState({ error: 'Please fill all fields!' });
		} else if (this.state.error == '') {
			socket.emit('create_lab_section', data);
			this.props.fetchCourse();
			this.close();
		}
	};

	close = () =>
		this.setState({
			coursesX: [],
			courses: [],
			M: false,
			T: false,
			W: false,
			Th: false,
			F: false,
			course_offering_id: '',
			emp_no: '',
			acad_year: '',
			semester: '',
			no_of_students: '',
			course_id: '',
			course_name: '',
			time_start: '',
			time_end: '',
			room: '',
			day: '',
			section: '',
			unit: '',
			max_capacity: '',
			status: '',
			course_title: '',
			description: ''
		});

	render() {
		const {
			error,
			M,
			T,
			W,
			Th,
			F,
			courses,
			acad_year,
			semester,
			time_start,
			time_end,
			room,
			section,
			unit,
			max_capacity
		} = this.state;

		return (
			<Modal
				size="large"
				style={inlineStyle.modal}
				onClose={this.close}
				trigger={<Button icon="plus" positive />}
				basic
				closeIcon
			>
				<Modal.Content>
					<Container>
						<Segment padded="very">
							<Grid>
								<Grid.Row>
									<Header as="h2">Add New Laboratory </Header>
								</Grid.Row>
								<Grid.Row>
									<Form>
										<Form.Group>
											<Form.Input
												label="Section"
												placeholder="Course section"
												name="section"
												value={section}
												onChange={this.handleChange}
											/>
											<Form.Input
												label="Room"
												placeholder="Room"
												name="room"
												value={room}
												onChange={this.handleChange}
											/>
											<Form.Input
												min={0}
												type="number"
												label="Maximum Capacity"
												placeholder="Max Capacity"
												name="max_capacity"
												value={max_capacity}
												onChange={this.handleChange}
											/>
											<Form.Input
												type="time"
												label="Time start"
												placeholder="Time start"
												name="time_start"
												value={time_start}
												onChange={this.handleChange}
											/>
											<Form.Input
												type="time"
												label="Time end"
												Input
												placeholder="Time end"
												name="time_end"
												value={time_end}
												onChange={this.handleChange}
											/>
										</Form.Group>

										<Form.Group>
											<Form.Input
												width={3}
												min={0}
												max={5}
												type="number"
												label="Units"
												name="unit"
												placeholder="Units"
												value={unit}
												onChange={this.handleChange}
											/>
											<Form.Input
												type="number"
												label="Acad Year"
												name="acad_year"
												placeholder="Acad Year"
												value={acad_year}
												onChange={this.handleChange}
											/>
											<Form.Input
												type="number"
												label="Semester"
												name="semester"
												placeholder="Semester"
												value={semester}
												onChange={this.handleChange}
											/>
											<Form.Field label="Days"> </Form.Field>

											<Form.Field>
												<Button
													toggle
													circular
													size="medium"
													content="M"
													active={M}
													onClick={this.handleDayChange}
												/>
												<Button
													toggle
													circular
													size="medium"
													content="T"
													active={T}
													onClick={this.handleDayChange}
												/>
												<Button
													toggle
													circular
													size="medium"
													content="W"
													active={W}
													onClick={this.handleDayChange}
												/>
												<Button
													toggle
													circular
													size="medium"
													content="Th"
													active={Th}
													onClick={this.handleDayChange}
												/>
												<Button
													toggle
													circular
													size="medium"
													content="F"
													active={F}
													onClick={this.handleDayChange}
												/>
											</Form.Field>
										</Form.Group>
										<Button
											content="Submit"
											floated="left"
											onClick={this.handleSubmit}
										/>
										<Container text> {error} </Container>
									</Form>
								</Grid.Row>
							</Grid>
						</Segment>
					</Container>
				</Modal.Content>
			</Modal>
		);
	}
}

export default AddCourseLab;
