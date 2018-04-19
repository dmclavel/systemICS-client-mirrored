import React, { Component } from 'react';
import {
	Grid,
	Header,
	Table,
	Input,
	Button,
	Dropdown
} from 'semantic-ui-react';
import CourseRow from './CourseRow';
import AddCourseModal from './AddCourseModal';
import AddLectureSection from './AddLectureSection';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';

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
		const data = { acad_year: 2015, semester: 1 };
		socket.emit('view_sections', data);
		socket.on('view_sections', course => {
			this.setState({ coursesX: course });
		});
	}

	fetchCourse = () => {
		const socket = socketIOClient(this.state.address);
		const data = { acad_year: 2015, semester: 1 };
		socket.emit('view_sections', data);
		socket.on('view_sections', course => {
			this.setState({ coursesX: course });
		});
	};

	render() {
		const { coursesX } = this.state;

		return (
			<Grid className="admin-container">
				<Grid.Row>
					<Header as="h1" textAlign="left">
						Course Offering
					</Header>
				</Grid.Row>

				<Grid.Row width={16}>
					<Grid.Column width={9}>
						<Input fluid icon="search" width={12} />
					</Grid.Column>
					<Grid.Column width={7}>
						<AddCourseModal />
						<AddLectureSection />
					</Grid.Column>
				</Grid.Row>

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
			</Grid>
		);
	}
}

export default AdminCard;
