import React, { Component } from 'react';
import { Grid, Container, Header, Table, Button, Card, Input, Modal, Segment, Form} from 'semantic-ui-react';
import CourseRow from '../../components/CourseRow';
import LoggedInNavBar from '../../components/LoggedInNavBar';
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

		handleChange = (e, {name, value}) => {
			this.setState({[name]: value})
		}

		handleSubmit = () => {
			const{course_id, time_start, time_end, room, day, section, unit, max_capacity} = this.state

			this.setState(
				{course_id:course_id,
				time_start:time_start,
				time_end:time_end,
				room:room,
				day:day,
				section:section,
				unit:unit,
				max_capacity:max_capacity}
			)
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
      <div className='Admin'>
      <LoggedInNavBar />
      <Container>
       <Grid>
      	 <Grid.Column width={6}> </Grid.Column>
      	  <Grid.Column width={10}>
						 <Header as="h1" textAlign="left">
						 	Faculty Workload
						</Header>


            <Card centered>
            	<Card.Content>
            		<Input icon="search" transparent fluid/>
            	</Card.Content>
            </Card>

            <Modal style={inlineStyle.modal} onClose={this.close} trigger={<Button floated="right" positive content="Add course" />} basic size = 'small'>
            	<Modal.Content>
            	<Segment>
            	<Grid>
            		<Grid.Row>
            			<Header as="h2">Lecture </Header>
            		</Grid.Row>
            		<Grid.Row>
									<Form onSubmit={this.handleSubmit}>
										<Form.Group>
		            			<Form.Input placeholder="Course ID" name="course_id" value={course_id} onChange={this.handleChange}/>
		            			<Form.Input placeholder="Course section" name="section" value={section} onChange={this.handleChange}/>
		            			<Form.Input placeholder="Time start" name="time_start" value={time_start} onChange={this.handleChange}/>
										</Form.Group>
										<Form.Group>
											<Form.Input placeholder="Time end" name="time_end" value={time_end} onChange={this.handleChange}/>
		            			<Form.Input placeholder="Days" name="day" value={day} onChange={this.handleChange}/>
		            			<Form.Input placeholder="Room" name="room" value={room} onChange={this.handleChange}/>
										</Form.Group>
										<Form.Group>
											<Form.Input placeholder="Max Capacity" name="max_capacity" value={max_capacity} onChange={this.handleChange}/>
		            			<Form.Input placeholder="Units" name="unit" value={unit} onChange={this.handleChange}/>
											<Form.Button content="Add" />
										</Form.Group>
									</Form>

									<strong>onChange:</strong>
					        <pre>{JSON.stringify({ course_id, time_start, time_end, room, day, section, unit, max_capacity }, null, 8)}</pre>
					        <strong>onSubmit:</strong>
					        <pre>{JSON.stringify({ course_id, time_start, time_end, room, day, section, unit, max_capacity }, null, 8)}</pre>
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


			</Grid>
      </Container>
      </div>
    );
  }
}

export default Admin;
