import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Dropdown, Container, Checkbox , Popup} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import ErrorMessage from './ErrorMessage';

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
      address: 'https://sleepy-falls-95372.herokuapp.com/',
      isErrorName: false,
      isErrorMail: false,
      isErrorCurriculum: false,
      isErrorStatus: false,
      isErrorNumber: false,
      isErrorMessage: false
    };
    autobind(this);
  }

  handleName = (e) => {
    if (e.target.value != ""){
      this.setState({isErrorName: false});
    }else{
      this.setState({isErrorName: true});
    }
    this.setState({name: e.target.value});
    
  }

  handleEmail = (e) => {
    if (e.target.value != ""){
      this.setState({isErrorMail: false});
    }else{  
      this.setState({isErrorMail: true});
    }
    this.setState({email_add: e.target.value});
  }

  handleCurriculum = (e) => {
    if (e.target.value != ""){
      this.setState({isErrorCurriculum: false});
    }else{
      this.setState({isErrorCurriculum: true});
    }
    this.setState({curriculum: e.target.value});
  }

  handleStatus = (e) => {
    if (e.target.value != ""){
      this.setState({isErrorStatus: false});
    }else{
      this.setState({isErrorStatus: true});
    }
    this.setState({status: e.target.value});
  }

  handleNumber = (e) =>{
    if (e.target.value != ""){
      this.setState({isErrorNumber: false});
    }else{
      this.setState({isErrorNumber: true});
    }
    this.setState({student_number: e.target.value});
  }

  handleSubmit = (e) => {
    if (this.state.isErrorName == false && this.state.isErrorMail == false && this.state.isErrorCurriculum == false && this.state.isErrorStatus == false && this.state.isErrorNumber == false){
      const socket = socketIOClient(this.state.address); //establish connection to the server
      socket.emit('create_student', {student_number: this.state.student_number, name: this.state.name, email_add: this.state.email_add, status: this.state.status, curriculum: this.state.curriculum}); //send data to 'login' endpoint in server
      socket.on('create_student', returnValueFromServer => {
        console.log(returnValueFromServer);
      });
      this.props.fetchData();
      this.handleClose();
    }else{
      this.setState({isErrorMessage: true});
    }
    
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
                    { 
                      this.state.isErrorMessage == true? <ErrorMessage/>: <div/>
                    }
                    <Form>
                      <Form.Group widths='equal'>
                        <Form.Input error={this.state.isErrorName} fluid label='Name' placeholder='Name' onChange={this.handleName}/>
                        <Form.Input error={this.state.isErrorMail} fluid label='Email address' placeholder='Email address' onChange={this.handleEmail}/>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Input error={this.state.isErrorCurriculum} fluid label='Curriculum' placeholder='Curriculum' onChange={this.handleCurriculum}/>
                        <Form.Input error={this.state.isErrorStatus} fluid label='Status' placeholder='Status' onChange={this.handleStatus}/>
                        <Form.Input error={this.state.isErrorNumber} fluid label='Student Number' placeholder='Name' onChange={this.handleNumber}/>
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
