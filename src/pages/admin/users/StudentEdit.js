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
class StudentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      email_add: this.props.email_add,
      curriculum: this.props.curriculum,
      status: this.props.status,
      student_number: this.props.student_number,
      modalOpen: false,
      address: 'https://sleepy-falls-95372.herokuapp.com/'
    };
    autobind(this);
  }

  handleName = (e) => {
    this.setState({name: e.target.value});
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
    socket.emit('modify_student', {student_number: this.state.student_number, name: this.state.name, email_add: this.state.email_add, status: this.state.status, curriculum: this.state.curriculum}); //send data to 'login' endpoint in server
    socket.on('modify_student', returnValueFromServer => {
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
       <Modal closeIcon size='large' style={inlineStyle.modal} trigger={<Button icon="pencil" positive/>} basic onClose={this.handleClose} onOpen={this.handleOpen} open={this.state.modalOpen}>
            <Modal.Content>
              <Container>
                <Segment padded="very">
                    <Form>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='Name' placeholder={this.state.name} onChange={this.handleName}/>
                        <Form.Input fluid label='Email address' placeholder={this.state.email_add} onChange={this.handleEmail}/>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='Curriculum' placeholder={this.state.curriculum} onChange={this.handleCurriculum}/>
                        <Form.Input fluid label='Status' placeholder={this.state.status} onChange={this.handleStatus}/>
                      </Form.Group>
                    </Form>
                    <h2>
                     Are you sure you want to edit {this.state.name}?
                    </h2>
                      <Grid.Row>
                        <Form>
                          <Button content="Confirm Changes" floated="right" positive onClick={this.handleSubmit}/ >
                          <Modal.Actions>
                            <Button content="Cancel" floated="right" negative onClick={this.handleClose}/ >
                          </Modal.Actions>
                        </Form>
                    </Grid.Row>
                      
                </Segment>
              </Container>
            </Modal.Content>
       </Modal>
    );
  }
}

export default StudentEdit;