import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Divider, Container, Checkbox } from 'semantic-ui-react';

const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'

	}
};
class DeleteCourse extends Component {

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

       <Modal size='small' style={inlineStyle.modal} onClose={this.close} trigger={<Button negative icon="close"/>} basic closeIcon>
           <Modal.Content>
            	<Container>
            		<Segment padded="very">
            	<Grid centered>
            		<Grid.Row>
            		<Header as="h2">Are you sure you want to delete {this.props.coursecode} {this.props.section}? </Header>
            		</Grid.Row>
								<Divider/>
								<Grid.Row>
									
									<Form.Button content="Cancel" floated="right" inverted color='red'/ >
									<Form onSubmit={this.props.submit}>
										<Form.Button content="Proceed" floated="right" inverted color='green'/ >
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

export default DeleteCourse;
