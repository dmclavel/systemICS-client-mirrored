import React, { Component } from 'react';
import { Grid, Container, Header, Table, Button, Card, Input, Modal, Segment} from 'semantic-ui-react';
import CourseRow from './CourseRow';
import NavbarIn from '../components/NavbarIn';
import Heading from '../components/Heading';
import Sidebar from '../components/Sidebar';
import AddCourseModal from './AddCourseModal';
import autobind from 'react-autobind';
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
			courses : [
			
				{"course_title":"Object Oriented Programming", "course_number": "CMSC 22", "time_start": "10:00AM", "time_end" : "1:00PM", "room" : "PC2L", "day" : "M", "section" : "ST3L", "unit" : "3.00", "max_capacity" : 20, "population":4, "status":true},
				{"course_title":"Object Oriented Programming", "course_number": "CMSC 22", "time_start": "10:00AM", "time_end" : "1:00PM", "room" : "PC2L", "day" : "T", "section" : "ST4L", "unit" : "3.00", "max_capacity" : 20, "population":2, "status":true},
				{"course_title":"Object Oriented Programming", "course_number": "CMSC 22", "time_start": "1:00PM", "time_end" : "4:00PM", "room" : "PC4L", "day" : "T", "section" : "ST5L", "unit" : "3.00", "max_capacity" : 20, "population":14, "status":false}
			],
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
			
			var newcourse = [{course_number:'', max_capacity:''}];
			newcourse.course_number = course_number;
			newcourse.time_start = time_start;
			newcourse.time_end = time_end;
			newcourse.capacity = max_capacity;
			
			this.state.courses.push(newcourse);
			
		}

		close = () =>
			this.setState(
				{course_id:'',
				time_start:'',
				time_end:'',
				room:'',
				day:'',
				section:'',
				unit:'',
				max_capacity:''}
			)

  render() {
		const{course_id, time_start, time_end, room, day, section, unit, max_capacity} = this.state


    return(
      			<Grid.Column width={10}>
	      			<Header as="h1" textAlign="left">
							 	Faculty Workload
							</Header>
	            		<Input icon="search" width={12}/>
	            <AddCourseModal handler={this.handleChange} submit={this.handleSubmit} />

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
                  <CourseRow coursecode="CMSC 128" section="a8l" time="1:00-4:00" room="ics pc4" students="15"/>
                </Table.Body>
            </Table>
      		</Grid.Column>
    );
  }
}

export default AdminCard;
