import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Dropdown, Container, Checkbox , Popup} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import ErrorMessage from './ErrorMessage';
import config from './../../../config.json';

const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'

	}
};
class EditFaculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      email_add: this.props.email_add,
      isRegCom: this.props.isRegCom,
      status: this.props.status,
      emp_no: this.props.emp_no,
      modalOpen: false,
      options: [ { key: 'Faculty', value: 1, text: 'Faculty' }, { key: 'Admin', value: 3, text: 'Admin' }, { key: 'Registration Committee', value: 2, text: 'Registration Committee' }, ],
      statusOptions: [ { key: 'Active', value: 'Active', text: 'Active' }, { key: 'Resigned', value: 'Resigned', text: 'Resigned' }, { key: 'On Leave', value: 'On Leave', text: 'On Leave' }, ],
      address: config.backendAddress,
      isErrorName: false,
      isErrorMail: false,
      isErrorAccessLevel: false,
      isErrorStatus: false,
      isErrorMessage: false,
      getAccessLevel: this.props.isRegCom == 1? 'Faculty': this.props.isRegCom == 2? 'Registration Committee': 'Admin'
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

  handleAccessLevel = (event: SyntheticEvent, data: object) => {
    if (event.target.value != ""){
      this.setState({isErrorAccessLevel: false});
    }else{
      this.setState({isErrorAccessLevel: true});
    }
    this.setState({isRegCom: data.value});
  }

  handleStatus = (event: SyntheticEvent, data: object) => {
    if (event.target.value != ""){
      this.setState({isErrorStatus: false});
    }else{
      this.setState({isErrorStatus: true});
    }
    this.setState({status: data.value});
  }

  handleSubmit = (e) => {
    if (this.state.isErrorStatus == false && this.state.isErrorAccessLevel == false && this.state.isErrorMail == false && this.state.isErrorName == false){
      const socket = socketIOClient(this.state.address); //establish connection to the server
      socket.emit('modify_faculty', {emp_no: this.state.emp_no, name: this.state.name, email_add: this.state.email_add, status: this.state.status, isRegCom: this.state.isRegCom}); //send data to 'login' endpoint in server
      socket.on('modify_faculty', returnValueFromServer => {
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
       <Modal closeIcon size='large' style={inlineStyle.modal} trigger={<Button icon="pencil" color="teal" positive/>} basic onClose={this.handleClose} onOpen={this.handleOpen} open={this.state.modalOpen}>
         	<Modal.Content>
          	<Container>
          	<Segment padded="very">
                { 
                  this.state.isErrorMessage == true? <ErrorMessage/>: <div/>
                }
  							<Form>
                  <Form.Group widths='equal'>
                    <Form.Input error={this.state.isErrorName} fluid label='Name' placeholder={this.state.name} onChange={this.handleName}/>
                    <Form.Input error={this.state.isErrorMail} fluid label='Email address' placeholder={this.state.email_add} onChange={this.handleEmail}/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Dropdown error={this.state.isErrorAccessLevel} fluid label = "Access Level" placeholder={this.state.getAccessLevel} search selection options={this.state.options} onChange={this.handleAccessLevel}/>
                    <Form.Dropdown error={this.state.isErrorStatus} fluid label = "Status" placeholder={this.state.status} search selection options={this.state.stateOptions} onChange={this.handleStatus}/>
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

export default EditFaculty;
