import React, { Component } from 'react';
import { Grid, Container, Header, Table, Button, Card, Input, Modal, Segment} from 'semantic-ui-react';
import CourseRow from './CourseRow';
import NavbarIn from '../components/NavbarIn';
import Heading from '../components/Heading';
import Sidebar from '../components/Sidebar';

import autobind from 'react-autobind';
const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'

	}
};

class Admin extends Component {
	constructor(){
		super()
		
		this.state = {
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
	
	handleCourseId(e){
		this.setState( {course_id : e.target.value} );
	}
	
	handleTimeStart(e){
		this.setState( {time_start : e.target.value} );
	}
	
	handleTimeEnd(e){
		this.setState( {time_end : e.target.value} );
	}
	
	handleRoom(e){
		this.setState( {room : e.target.value} );
	}
	
	handleDay(e){
		this.setState( {day : e.target.value} );
	}
	
	handleSection(e){
		this.setState( {section : e.target.value} );
	}
	
	handleUnit(e){
		this.setState( {unit : e.target.value} );
	}
	
	handleMaxCapacity(e){
		this.setState( {max_capacity : e.target.value} );
	}
	
	handleAddButton(e){
	
	}
	
	handleChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState({ state });
	}
	
  render() {
    return(
      <div className='Admin'>
      	<Grid>
      		<Grid.Row>
      			<NavbarIn />
      			<Heading />
      		</Grid.Row>
      		<Grid.Row>
      			<Grid.Column width={1} />
      			<Grid.Column width={4}>
      				<Sidebar />
      			</Grid.Column>
      			<Grid.Column width={10}>
	      			<Header as="h1" textAlign="left">
							 	Faculty Workload
							</Header>
	            		<Input icon="search" width={12}/>
	            		<Modal style={inlineStyle.modal} trigger={<Button floated="right" positive content="Add course" />} basic size = 'small'>
            	<Modal.Content>
            	<Segment>
            	<Grid>
            		<Grid.Row>
            			<Header as="h2">Lecture </Header>
            		</Grid.Row>
            		<Grid.Row>
            			<Input name="course_id" handler={this.handleCourseId} placeholder="Course code" />
            			<Input placeholder="Course title" />
            			<Input placeholder="Course section" />
            			<Input placeholder="Time start" />
            			<Input placeholder="Time end" />
            			<Input placeholder="Days" />
            			<Input placeholder="Room" />
            			<Input placeholder="Max Capacity" />
            			<Input placeholder="Units" />
            			
            			
            			<Container> <Button positive content="Add" floated="right"/> </Container>
            		</Grid.Row>
            		
            		<Grid.Row>
            		<Header as="h2">Laboratory </Header>
            		</Grid.Row>
            	</Grid>
            	</Segment>
            	</Modal.Content>
            </Modal>

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
      		</Grid.Row>
			</Grid>
      </div>
    );
  }
}

export default Admin;
