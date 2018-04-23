import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Dropdown, Container, Checkbox , Popup} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import config from './../../../config.json';

const inlineStyle={
  modal :{
    marginTop: '500px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black'

  }
};

class FacultyDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: config.backendAddress,
      modalOpen: false
    };
    autobind(this);
  }

  handleOpen = (e) => {
    this.setState({modalOpen: true});
  }


  handleDelete = (e) => {
    const socket = socketIOClient(this.state.address); //establish connection to the server
    // listens on an endpoint and executes fallback function
    socket.emit('remove_faculty', {emp_no: this.props.emp_no}); //send data to 'login' endpoint in server
    socket.on('remove_faculty', returnValueFromServer => {
      console.log(returnValueFromServer);
    });
    this.props.fetchData();
    //function call to close the modal
    this.handleClose();
  }

  handleClose = (e) => {
    //closes the modal
    this.setState({modalOpen: false});
  }
  render() {
    return(
       <Modal closeIcon size='large' style={inlineStyle.modal} trigger={<Button icon="x" negative 
        />} onClose={this.handleClose} onOpen={this.handleOpen} open={this.state.modalOpen} basic>
            <Modal.Content>
              <Container>
                <Segment padded="very">
                    <h2>
                     Are you sure you want to delete {this.props.name}?
                    </h2>
                      <Grid.Row>
                        <Form>
                          <Button negative content="Delete" floated="right" positive onClick={this.handleDelete}/ >
                          <Button positive content="Cancel" floated="right" positive onClick={this.handleClose} onOpen={this.handleOpen}/ >
                        </Form>
                    </Grid.Row>

                </Segment>
              </Container>
            </Modal.Content>
       </Modal>
    );
  }
}

export default FacultyDelete;
