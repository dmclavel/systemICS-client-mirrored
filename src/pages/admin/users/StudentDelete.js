import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Dropdown, Container, Checkbox , Popup} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

const inlineStyle={
  modal :{
    marginTop: '500px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black'

  }
};

class StudentDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: 'https://sleepy-falls-95372.herokuapp.com/'
    };
    autobind(this);
  }


  handleDelete = (e) => {
    const socket = socketIOClient(this.state.address); //establish connection to the server
    // listens on an endpoint and executes fallback function
    socket.emit('remove_student', {student_number: this.props.student_number}); //send data to 'login' endpoint in server
    socket.on('remove_student', returnValueFromServer => {
      console.log(returnValueFromServer);
    });
  }

  handleCancel = (e) => {
    alert("Cancelling deletion..");
  }
  render() {
    return(
       <Modal size='large' style={inlineStyle.modal} trigger={<Button icon="x" negative/>} basic>
            <Modal.Content>
              <Container>
                <Segment padded="very">
                    <h2>
                     Are you sure you want to delete {this.props.name}?
                    </h2>
                      <Grid.Row>
                        <Form>
                          <Button negative content="Delete" floated="right" positive onClick={this.handleDelete}/ >
                          <Button positive content="Cancel" floated="right" positive onClick={this.handleCancel}/ >
                        </Form>
                    </Grid.Row>
                      
                </Segment>
              </Container>
            </Modal.Content>
       </Modal>
    );
  }
}

export default StudentDelete;
