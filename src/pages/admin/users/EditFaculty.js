import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Dropdown, Container, Checkbox , Popup} from 'semantic-ui-react';
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
class EditFaculty extends Component {
  render() {
  	return(
       <Modal size='large' style={inlineStyle.modal} trigger={ <Button icon="pencil" color="teal" /> } basic>
           	<Modal.Content>
            	<Container>
            	<Segment padded="very">
            	<Grid>
            		<Grid.Row>
            		<Header as="h2">{this.props.name}</Header>
            		</Grid.Row>
						<Grid.Row>
							<Form >
								<Form.Group>
            						<Form.Input width={4} label="Employee No." placeholder="Emp. No." name="emp_no" />
            						<Form.Input label="Name" placeholder="Name" name="name" />
            						<Form.Input label="Email" placeholder="Email" name="email" />
            						<Form.Input label="Status" placeholder="Status" name="status" />
            						<Form.Input label="Access Level" placeholder="Access Level" name="acess_lvl" />
								</Form.Group>

							</Form>
					    </Grid.Row>

						<Grid.Row>
							<Form>
								<Button content="Edit" floated="right" positive onClick={this.handleSubmit}/ >
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

export default EditFaculty;
