import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Divider, Container, Checkbox } from 'semantic-ui-react';
import autobind from 'react-autobind';

const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'

	}
};
class EditCourse extends Component {
	constructor(props){
		super(props)

		this.state = {
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			coursesX : [],
			courses : [],
			course_offering_id: this.props.courseoffering,
			emp_no: this.props.emp_no,
			acad_year: this.props.acadyear,
			semester: this.props.sem,
			no_of_students: this.props.noofstudents,
			course_id: this.props.course,
			course_name: this.props.coursecode,
			time_start:this.props.timestart,
			time_end: this.props.timeend,
			room: this.props.room,
			day:this.props.day,
			section: this.props.section,
			unit: this.props.unit,
			max_capacity: this.props.maxcapacity,
			status:this.props.status,
			course_title: this.props.title,
			description: this.props.desc
		}
		autobind(this);
	}


	handleChange = (e, {name, value}) => {
		this.setState({[name]: value})
	}

	componentDidMount(){

	}

  render() {
  	const{course_offering_id, course_id, course_name, emp_no, acad_year, semester, no_of_students, time_start, time_end, room, day, section, unit, max_capacity, course_title, status, description} = this.state
    return(

       <Modal size='large' style={inlineStyle.modal} trigger={<Button icon="pencil" color="teal" />} basic closeIcon>
           <Modal.Content>
            	<Container>
            		<Segment padded="very">
            	<Grid>
            		<Grid.Row>
            		<Header as="h2">Edit {this.props.coursecode} {this.props.course} {this.props.section} </Header>
            		</Grid.Row>
								<Grid.Row>
									<Form >
										<Form.Group>
		            			<Form.Input label="Course Name" placeholder="Course name" name="course_name" value={course_name} onChange={this.handleChange}/>
		            			<Form.Input label="Course section" placeholder="Course section" name="section" value={section} onChange={this.handleChange}/>
		            			<Form.Input label="Time start" placeholder="Time start" name="time_start" value={time_start} onChange={this.handleChange}/>

											<Form.Input label="Time end" Input placeholder="Time end" name="time_end" value={time_end} onChange={this.handleChange}/>

										</Form.Group>
										<Form.Group>
		            			<Form.Field label="Days"> </Form.Field>
		            		</Form.Group>
		            		<Form.Group>
		            			<Form.Field>
		            			 <Button toggle circular size="tiny" content='M' />
		            			 <Button toggle circular size="tiny" content='T' />
		            			 <Button circular size="tiny" content='W' />
		            		  <Button circular size="tiny" content='Th' />
		            		  <Button circular size="tiny" content='F' />
		            		</Form.Field>
										</Form.Group>
										<Form.Group>
										<Form.Input label="Room" placeholder="Room" name="room" value={room} onChange={this.handleChange}/>
											<Form.Input min={0} type="number" label="Maximum Capacity" placeholder="Max Capacity" name="max_capacity" value={max_capacity} onChange={this.handleChange}/>
		            			<Form.Input min={0} max={5}type="number" label="Units" name="unit" placeholder="Units" width={2} value={unit} onChange={this.handleChange}/>

										</Form.Group>

									</Form>
					      </Grid.Row>
								<Grid.Row>
									<Form onSubmit={this.props.submit}>
										<Form.Button content="Edit" floated="right" positive/ >
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

export default EditCourse;
