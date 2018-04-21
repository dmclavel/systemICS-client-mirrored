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
class StudentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email_add: '',
      curriculum: '',
      status: '',
      student_number: '',
      modalOpen: false,
      address: 'https://sleepy-falls-95372.herokuapp.com/'
    };
    autobind(this);
  }

  handleName = (e) => {
    this.setState({name: e.target.value});
  }

  handleNumber = (e) => {
    this.setState({student_number: e.target.value});
  }

  handleEmail = (e) => {
    this.setState({email_add: e.target.value});
  }

  handleCurriculum = (e) => {
    this.setState({curriculum: e.target.value});
  }

  handleStatus = (e) => {
    this.setState({status: e.target.value});
  }

  handleSubmit = (e) => {
    const socket = socketIOClient(this.state.address); //establish connection to the server
    socket.emit('create_student', {student_number: this.state.student_number, name: this.state.name, email_add: this.state.email_add, status: this.state.status, curriculum: this.state.curriculum}); //send data to 'login' endpoint in server
    socket.on('create_student', returnValueFromServer => {
      console.log(returnValueFromServer);
    });
    this.props.fetchData();
    this.handleClose();
  }

  handleClose = (e) => {
    this.setState({modalOpen: false});
  }

  handleOpen = (e) => {
    this.setState({modalOpen: true});
  }


  render() {
    return(
       <Modal closeIcon size='large' style={inlineStyle.modal} trigger={<Button positive>Add Student</Button>} basic onClose={this.handleClose} onOpen={this.handleOpen} open={this.state.modalOpen}>
            <Modal.Content>
              <Container>
                <Segment padded="very">
                    <Form>
                      <Form.Group>
                        <Form.Input fluid label='Student Number' placeholder='Name' onChange={this.handleNumber}/>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='Name' placeholder='Name' onChange={this.handleName}/>
                        <Form.Input fluid label='Email address' placeholder='Email address' onChange={this.handleEmail}/>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='Curriculum' placeholder='Curriculum' onChange={this.handleCurriculum}/>
                        <Form.Input fluid label='Status' placeholder='Status' onChange={this.handleStatus}/>
                      </Form.Group>
                    </Form>
                    <h2>
                     Are you sure you want to add new student {this.state.name}?
                    </h2>
                      <Grid.Row>
                        <Form>
                          <Button content="Add Student" floated="right" positive onClick={this.handleSubmit}/ >
                          <Button content="Cancel" floated="right" negative onClick={this.handleClose}/ >
                        </Form>
                    </Grid.Row>
                      
                </Segment>
              </Container>
            </Modal.Content>
       </Modal>
    );
  }
}

export default StudentAdd;
