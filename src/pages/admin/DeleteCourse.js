import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Divider, Container, Checkbox } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';

const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'

	}
};

class DeleteCourse extends Component {

	constructor(){

	super();

	this.state =
		{ 
		address: 'https://sleepy-falls-95372.herokuapp.com/',
		open:false
		}
	}

	open = () => this.setState({ open: true });
	close = () => this.setState({open:false});

	handleDelete = () => {

		// const socket = socketIOClient(this.state.address);
		// socket.emit("", course_id:this.props.course_id);

		this.close();

	}

  render() {
  const { open } = this.state;
    return(

       <Modal size='small' style={inlineStyle.modal} open={open} onOpen={this.open} onClose={this.close} trigger={<Button negative icon="close"/>} basic>
           <Modal.Content>
            	<Container>
            	<Segment padded="very">
            	<Grid centered>

            		<Grid.Row>
            		<Header as="h2">Are you sure you want to delete {this.props.coursecode} {this.props.section}? </Header>
            		</Grid.Row>

				<Divider/>

					<Grid.Row>		
						<Button content="Cancel" floated="right" inverted color='red' onClick={this.close}/ >
						<Form>
							<Button content="Proceed" floated="right" inverted color='green' onClick={this.handleDelete}/ >
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
