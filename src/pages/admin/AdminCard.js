import React, { Component } from 'react';
import { Grid, Container, Header, Table, Button, Card, Input, Modal, Segment} from 'semantic-ui-react';
import CourseRow from './CourseRow';
import NavbarIn from '../components/NavbarIn';
import Heading from '../components/Heading';
import Sidebar from '../components/Sidebar';
import AddCourseModal from './AddCourseModal';
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
			course_id: '',
			time_start: '',
			time_end: '',
			room: '',
			day:'',
			section: '',
			unit:'',
			max_capacity: ''
		}
		autobind(this);
	}
		componentDidMount(){
			const socket = socketIOClient(this.state.address);
			const data = {email: 'pvgrubat@up.edu.ph'};
			socket.emit("view_all_active_course_offerings", data);
			socket.on("view_all_active_course_offerings", (course) => {
				this.setState({coursesX:course});
				console.log(this.state.coursesX);
			});
		}

		handleChange = (e, {name, value}) => {
			this.setState({[name]: value})
		}

		handleSubmit = () => {
			const{course_number, time_start, time_end, room, day, section, unit, max_capacity} = this.state

			this.setState(
				{course_number:course_number,
				time_start:time_start,
				time_end:time_end,
				room:room,
				day:day,
				section:section,
				unit:unit,
				max_capacity:max_capacity}
			)

			var newcourse = [{course_number:course_number, time_start:time_start, time_end:time_end, room:room, day:day, section:section, unit:unit, max_capacity:max_capacity}];

			this.state.courses.push(newcourse)
			this.setState({courses:newcourse});
		}

		close = () =>
				this.setState(
					{course_number:'',
					time_start:'',
					time_end:'',
					room:'',
					day:'',
					section:'',
					unit:'',
					max_capacity:''}
				)

  render() {
		const{course_id, time_start, time_end, room, day, section, unit, max_capacity, coursesX, courses} = this.state


    return(
      			<Grid.Column width={10}>
	      			<Header as="h1" textAlign="left">
							 	Faculty Workload
							</Header>
	            		<Input icon="search" width={12}/>
	            <AddCourseModal handler={this.handleChange} submit={this.handleSubmit} close={this.close}/>

      				<Table textAlign="center">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Course Code</Table.HeaderCell>
                  <Table.HeaderCell>Section</Table.HeaderCell>
                  <Table.HeaderCell>Time</Table.HeaderCell>
                  <Table.HeaderCell>Room</Table.HeaderCell>
                  <Table.HeaderCell>Students</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                	{coursesX.map((course) => {
                	console.log(course)
                		return <CourseRow coursecode={course.course_name} section={course.section} time_start={course.time_start} time_end={course.time_end} room={course.room} students="15"/>
                	})}

									{courses.map((newcourse) => {
									console.log(newcourse)
									  return <CourseRow coursecode={newcourse.course_number} section={newcourse.section} time_start={newcourse.time_start} time_end={newcourse.time_end} room={newcourse.room} students="15"/>
									})}
                </Table.Body>
            </Table>
      		</Grid.Column>
    );
  }
}

export default AdminCard;
