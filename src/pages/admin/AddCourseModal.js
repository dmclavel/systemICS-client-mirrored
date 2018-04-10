import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Divider, Container, Checkbox, Input } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'

	}
};
class AddCourseModal extends Component {

	constructor(){
		super()

		this.state = {
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			coursesX : [],
			courses : [],
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
			day:'',
			section: '',
			unit:'',
			max_capacity: '',
			status: '',
			course_title: '',
			description: '',
		}
		autobind(this);
	}

	handleChange = (e, {name, value}) => {
		const{course_offering_id, course_id, course_name, emp_no, acad_year, semester, no_of_students, time_start, time_end, room, day, section, unit, max_capacity, course_title, status, description, coursename_error, coursetitle_error, desc_error} = this.state

	}

	handleSubmit = () => {
		const{course_offering_id, course_id, course_name, emp_no, acad_year, semester, no_of_students, time_start, time_end, room, day, section, unit, max_capacity, course_title, status, description, coursename_error, coursetitle_error, desc_error, course} = this.state

		this.setState(
			{
			course_title:course_title,
			course_name:course_name,
			description:description,
			course_name:course_name,
			time_start:time_start,
			time_end:time_end,
			room:room,
			day:day,
			section:section,
			unit:unit,
			max_capacity:max_capacity
			}
		)

		const socket = socketIOClient(this.state.address);

		const data = {email: 'pvgrubat@up.edu.ph', course_name:course_name, course_title:course_title, description:description};
		console.log(data);
		socket.emit("insert_course", data);
		const data2 = {email: 'pvgrubat@up.edu.ph', acad_year:2015, semester:2, time_start:'11:00 AM', time_end:'12:00 PM', room:'ss', no_of_students:30, day:'W', section:'TG-1L', section_type:1, max_capacity:20, course_id:1, emp_no:5};
		console.log(data2);
		socket.emit("add_course_offering", data2);
	}

	close = () =>
		this.setState(
			{course_title:'',
			course_name: '',
			course_number:'',
			time_start:'',
			time_end:'',
			room:'',
			day:'',
			section:'',
			unit:'',
			max_capacity:''}
		)

  render() {
		const{course_offering_id, course_id, course_name, emp_no, acad_year, semester, no_of_students, time_start, time_end, room, day, section, unit, max_capacity, course_title, status, description, coursename_error, coursetitle_error, desc_error} = this.state

    return(

       <Modal size='large' style={inlineStyle.modal} onClose={this.close} trigger={<Button floated="right" positive content="Add course" />} basic closeIcon>
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
										<Form.Input width={3} label="Course Name" placeholder="Course Name" name="course_name" value={course_name} onChange={this.handleChange} required/>
										<Form.Input width={3} label="Course Title" placeholder="Course Title" name="course_title" value={course_title} onChange={this.handleChange} required/>
										<Form.Input width={10} label="Course Description" placeholder="Course Description" name="description" value={description} onChange={this.handleChange} required/>
										</Form.Group>
										</Form>
									</Grid.Column>
								</Grid.Row>
									<Grid.Row>
									<Form onSubmit={this.props.submit}>
										<Form.Button content="Submit" floated="right" positive/ >
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

export default AddCourseModal;
