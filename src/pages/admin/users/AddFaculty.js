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
class AddFaculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email_add: '',
      isRegCom: '',
      status: '',
      emp_no: '',
      isErrorMessage: false,
      isErrorName: false,
      isErrorMail: false,
      isErrorReg: false,
      isErrorStatus: false,
      isErrorNumber: false,
      modalOpen: false,
      options: [ { key: 'Faculty', value: 0, text: 'Faculty' }, { key: 'Admin', value: 2, text: 'Admin' }, { key: 'Registration Committee', value: 1, text: 'Registration Committee' }, ],
      address: 'https://sleepy-falls-95372.herokuapp.com/'
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

  handleNumber = (e) => {
    if (e.target.value != ""){
      this.setState({isErrorNumber: false});
    }else{
      this.setState({isErrorNumber: true});
    }
    this.setState({emp_no: e.target.value});
  }

  handleEmail = (e) => {
    if (e.target.value != ""){
      this.setState({isErrorMail: false});
    }else{  
      this.setState({isErrorMail: true});
    }
    this.setState({email_add: e.target.value});
  }

  handleAccessLevel = (event: SyntheticEvent, data: object) => {
    this.setState({isRegCom: data.value});
  }

  handleStatus = (e) => {
    if (e.target.value != ""){
      this.setState({isErrorStatus: false});
    }else{
      this.setState({isErrorStatus: true});
    }
    this.setState({status: e.target.value});
  }

  handleSubmit = (e) => {
    if (this.state.isErrorStatus == false && this.state.isErrorMail == false && this.state.isErrorNumber == false && this.state.isErrorName == false && this.state.isErrorReg == false){
      const socket = socketIOClient(this.state.address); //establish connection to the server
      socket.emit('create_faculty', {emp_no: this.state.emp_no, name: this.state.name, email_add: this.state.email_add, status: this.state.status, isRegCom: this.state.isRegCom}); //send data to 'login' endpoint in server
      socket.on('create_faculty', returnValueFromServer => {
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
       <Modal closeIcon size='large' style={inlineStyle.modal} trigger={<Button color="teal" onClick={this.handleOpen} open={this.state.modalOpen}
        > Add Faculty </Button>} open={this.state.modalOpen} onOpen={this.handleOpen} onClose={this.handleClose} basic>
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
                        <Form.Dropdown error={this.state.isErrorReg} fluid label = "Access Level" placeholder='Faculty' search selection options={this.state.options} onChange={this.handleAccessLevel}/>
                        <Form.Input error={this.state.isErrorStatus} fluid label='Status' placeholder='Status' onChange={this.handleStatus}/>
                        <Form.Input error={this.state.isErrorNumber} fluid label='Employee Number' placeholder='Name' onChange={this.handleNumber}/>
                      </Form.Group>
                    </Form>
                    <h2>
                     Are you sure you want to add new faculty {this.state.name}?
                    </h2>
                      <Grid.Row>
                        <Form>
                          <Button content="Add Faculty" floated="right" positive onClick={this.handleSubmit}/ >
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

export default AddFaculty;
