import React, { Component } from 'react';
import {
	Grid,
	Container,
	Header,
	Table,
	Button,
	Card,
	Input,
	Modal,
	Segment,
	Dropdown
} from 'semantic-ui-react';
import CourseRow from './CourseRow';
import NavbarIn from '../components/navbar/NavbarIn';
import Heading from '../components/Heading';
import Sidebar from '../components/Sidebar';
import AddCourseModal from './AddCourseModal';
import AddLectureSection from './AddLectureSection';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';
const inlineStyle = {
	modal: {
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'
	}
};

const options = [
	{
		key: 1,
		value: 'test',
		text: '1st Semester 17-18'
	},
	{
		key: 2,
		value: 'test',
		text: '1st Semester 17-18'
	},
	{
		key: 3,
		value: 'test',
		text: '1st Semester 17-18'
	},
	{
		key: 4,
		value: 'test',
		text: '1st Semester 17-18'
	},
	{
		key: 5,
		value: 'test',
		text: '1st Semester 17-18'
	},
	{
		key: 6,
		value: 'test',
		text: '1st Semester 17-18'
	},
	{
		key: 7,
		value: 'test',
		text: '1st Semester 17-18'
	}
];

class AdminCard extends Component {
	constructor() {
		super();

		this.state = {
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			coursesX: [],
			courses: [],
			course_offering_id: '',
			course_title: '',
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
			description: ''
		};
		autobind(this);
	}
	componentDidMount() {
		const socket = socketIOClient(this.state.address);
		const data = { email: 'pvgrubat@up.edu.ph' };
		socket.emit('view_all_unarchived_sections', data);
		socket.on('view_all_unarchived_sections', course => {
			this.setState({ coursesX: course });
			console.log(this.state.coursesX);
		});
	}

	fetchCourse = () => {
		const socket = socketIOClient(this.state.address);
		const data = { email: 'pvgrubat@up.edu.ph' };
		socket.emit('view_all_unarchived_sections', data);
		socket.on('view_all_unarchived_sections', course => {
			this.setState({ coursesX: course });
		});
		console.log('Data changed');
	};

	render() {
		const {
			course_id,
			time_start,
			time_end,
			room,
			day,
			section,
			unit,
			max_capacity,
			status,
			description,
			coursesX,
			courses
		} = this.state;

		return (
			<Grid.Column width={10}>
				<Button icon="arrow left" />
				<Dropdown
					fluid
					placeholder="Select Friend"
					selection
					options={options}
				/>
				<Button icon="arrow right" />
				<Header as="h1" textAlign="left">
					Faculty Workload
				</Header>

				<Grid>
					<Grid.Row width={16}>
						<Grid.Column width={5}>
							<Input icon="search" width={12} />
						</Grid.Column>
						<Grid.Column width={3} />
						<Grid.Column width={8}>
							<AddCourseModal />
							<AddLectureSection />
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Table textAlign="center">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Course Code</Table.HeaderCell>
							<Table.HeaderCell>Section</Table.HeaderCell>
							<Table.HeaderCell>Day</Table.HeaderCell>
							<Table.HeaderCell>Time</Table.HeaderCell>
							<Table.HeaderCell>Room</Table.HeaderCell>
							<Table.HeaderCell>Max Capacity</Table.HeaderCell>
							<Table.HeaderCell>Students</Table.HeaderCell>
							<Table.HeaderCell>Status</Table.HeaderCell>
							<Table.HeaderCell>Actions</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{coursesX.map(course => {
							return (
								<CourseRow
									fetch_Course={this.fetchCourse}
									description={course.description}
									course={course.course_id}
									coursecode={course.course_name}
									day={course.day}
									section={course.section}
									time_start={course.time_start}
									time_end={course.time_end}
									room={course.room}
									section_type={course.section_type}
									maxcapacity={course.max_capacity}
									status={course.status}
									students={course.no_of_students}
									acadyear={course.acad_year}
									sem={course.semester}
									unit={course.unit}
									title={course.course_title}
									empno={course.emp_no}
									courseoffering={course.course_offering_id}
								/>
							);
						})}
					</Table.Body>
				</Table>
			</Grid.Column>
		);
	}
}

export default AdminCard;
