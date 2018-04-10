import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Divider, Container, Checkbox, Popup } from 'semantic-ui-react';

const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'

	}
};
class AddCourseLab extends Component {

	state = { course_number: '', time_start: '', time_end: '', room: '', day:'', section:'', unit:'',max_capacity:'' }

	handleChange = (e, {name, value}) => {
		this.setState({[name]: value})
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
  const { course_number, time_start, time_end, room, day, section, unit,max_capacity} = this.state;
    return(

       <Modal size='large' style={inlineStyle.modal} onClose={this.close} trigger={ <Button icon="plus" positive/>  } basic closeIcon>
           <Modal.Content>
            	<Container>
            		<Segment padded="very">
            	<Grid>
            		<Grid.Row>
            		<Header as="h2">Add New Laboratory </Header>
            		</Grid.Row>
								<Grid.Row>
									<Form >
											
										<Form.Group>
		            			<Form.Input label="Course section" placeholder="Course section" name="section" value={section} onChange={this.handleChange}/>
		            			<Form.Input label="Room" placeholder="Room" name="room" value={room} onChange={this.handleChange}/>
											<Form.Input min={0} type="number" label="Maximum Capacity" placeholder="Max Capacity" name="max_capacity" value={max_capacity} onChange={this.handleChange}/>
		            			<Form.Input type="time" label="Time start" placeholder="Time start" name="time_start" value={time_start} onChange={this.handleChange}/>
											<Form.Input type="time" label="Time end" Input placeholder="Time end" name="time_end" value={time_end} onChange={this.handleChange}/>
										</Form.Group>
										
										<Form.Group>
											<Form.Input width={3} min={0} max={5} type="number" label="Units" name="unit" placeholder="Units"  value={unit} onChange={this.handleChange}/>

		            			<Form.Field label="Days"> </Form.Field>

		            			<Form.Field>
		            			 <Button toggle circular size="medium" content='M' />
		            			 <Button toggle circular size="medium" content='T' />
		            			 <Button toggle  circular size="medium" content='W' />
		            		   <Button toggle circular size="medium" content='Th' />
		            		   <Button toggle circular size="medium" content='F' />
		            		</Form.Field>
										</Form.Group>

									</Form>
					      </Grid.Row>
								<Grid.Row>
									<Form onSubmit={this.props.submit}>
										<Form.Button content="Add Laboratory" floated="right" positive/ >
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
