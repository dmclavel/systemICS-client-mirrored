import React, { Component } from 'react';
import { Grid, Container, Header, Table, Button, Card, Input, Modal, Segment} from 'semantic-ui-react';
import CourseRow from './CourseRow';
import NavbarIn from '../components/navbar/NavbarIn';
import Heading from '../components/Heading';
import Sidebar from '../components/Sidebar';
import AddCourseModal from './AddCourseModal';
import AddLectureSection from './AddLectureSection';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';
const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'

	}
};

class AdminCard extends Component {

	constructor(){
		super()

		this.state = {
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			coursesX : [],
			courses : [],
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
			day:'',
			section: '',
			unit:'',
			max_capacity: '',
			description: ''
		}
		autobind(this);
	}
		componentDidMount(){
			const socket = socketIOClient(this.state.address);
			const data = {email: 'pvgrubat@up.edu.ph'};
			socket.emit("view_all_unarchived_sections", data);
			socket.on("view_all_unarchived_sections", (course) => {
				this.setState({coursesX:course});
				console.log(this.state.coursesX);
			});
		}

		fetchCourse =() => {
			const socket = socketIOClient(this.state.address);
			const data = {email: 'pvgrubat@up.edu.ph'};
			socket.emit("view_all_unarchived_sections", data);
			socket.on("view_all_unarchived_sections", (course) => {
				this.setState({coursesX:course});

			});
			console.log("Data changed");
		}



  render() {
		const{course_id, time_start, time_end, room, day, section, unit, max_capacity, status, description, coursesX, courses} = this.state


    return(
      			<Grid.Column width={10}>
	      			<Header as="h1" textAlign="left">
							 	Faculty Workload
							</Header>
	            		<Input icon="search" width={12}/>
	            <AddCourseModal/> <AddLectureSection />

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
                	{coursesX.map((course) => {
                		return( <CourseRow
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
                			courseoffering={course.course_offering_id}/> );

                	})}


                </Table.Body>
            </Table>
      		</Grid.Column>
    );
  }
}

export default AdminCard;
