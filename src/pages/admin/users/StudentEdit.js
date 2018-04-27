import React, { Component } from 'react';
import {
  Button,
  Modal,
  Form,
  Grid,
  Segment,
  Header,
  Dropdown,
  Container,
  Checkbox,
  Popup,
  Card
} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import ErrorMessage from './ErrorMessage';
import config from './../../../config.json';

const inlineStyle = {
  modal: {
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
      address: config.backendAddress,
      isErrorName: false,
      isErrorMail: false,
      isErrorCurriculum: false,
      isErrorStatus: false,
      isErrorMessage: false,
      statusOptions: [
        { key: 'Enrolled', value: 'Enrolled', text: 'Enrolled' },
        { key: 'Unenrolled', value: 'Unenrolled', text: 'Unenrolled' }
      ]
    };
    autobind(this);
  }

  handleName = (e) => {
    if (e.target.value.length !== 0){
      this.setState({isErrorName: false});
    }else{
      this.setState({isErrorName: true});
    }
    this.setState({ name: e.target.value });
  };

  handleEmail = (e) => {
    if (e.target.value.length !== 0){
      this.setState({isErrorMail: false});
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValid =  re.test(e.target.value);
      if (!isValid){
        this.setState({isErrorMail: true});
      }
    }else{
      this.setState({isErrorMail: true});
    }
    this.setState({ email_add: e.target.value });
  };

  handleCurriculum = (e) => {
    if (e.target.value.length !== 0){
      this.setState({isErrorCurriculum: false});
    }else{
      this.setState({isErrorCurriculum: true});
    }
    this.setState({ curriculum: e.target.value });
  };

  handleStatus = (event: SyntheticEvent, data: object) => {
    if (event.target.value != '') {
      this.setState({ isErrorStatus: false });
    } else {
      this.setState({ isErrorStatus: true });
    }
    this.setState({ status: data.value });
  };

  handleSubmit = e => {
    if (
      this.state.isErrorStatus == false &&
      this.state.isErrorCurriculum == false &&
      this.state.isErrorMail == false &&
      this.state.isErrorName == false
    ) {
      const socket = socketIOClient(this.state.address); //establish connection to the server
      socket.emit('modify_student', {
        student_number: this.state.student_number,
        name: this.state.name,
        email_add: this.state.email_add,
        status: this.state.status,
        curriculum: this.state.curriculum
      }); //send data to 'login' endpoint in server

      this.props.fetchData();
      this.handleClose();
    } else {
      this.setState({ isErrorMessage: true });
    }
  };

  handleClose = e => {
    this.setState({ modalOpen: false });
  };

  handleOpen = e => {
    this.setState({ modalOpen: true });
  };
  render() {
    return (
      <Modal
        closeIcon
        size="large"
        style={inlineStyle.modal}
        trigger={<Button icon="pencil" color="teal" onClick={()=>{this.setState({name: this.props.name,
      email_add: this.props.email_add,
      curriculum: this.props.curriculum,
      status: this.props.status,
      student_number: this.props.student_number})} />}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={this.state.modalOpen}
      >
        <Modal.Header>Edit Student</Modal.Header>
        <Modal.Content>
          {this.state.isErrorMessage && <ErrorMessage />}
          <Form>
            <Form.Group>
              <Form.Input
                disabled
                width={4}
                value={this.props.student_number}
                label="Student Number"
              />
              <Form.Input
                error={this.state.isErrorName}
                fluid
                width={12}
                label="Name"
                placeholder={this.state.name}
                onChange={this.handleName}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                error={this.state.isErrorMail}
                fluid
                label="Email address"
                placeholder={this.state.email_add}
                onChange={this.handleEmail}
              />
              <Form.Input
                error={this.state.isErrorCurriculum}
                fluid
                label="Curriculum"
                placeholder={this.state.curriculum}
                onChange={this.handleCurriculum}
              />
              <Form.Dropdown
                error={this.state.isErrorStatus}
                fluid
                label="Status"
                placeholder={this.state.status}
                search
                selection
                options={this.state.statusOptions}
                onChange={this.handleStatus}
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions className="modal-actions">
          <Button
            content="Confirm Changes"
            floated="right"
            positive
            onClick={this.handleSubmit}
          />
          <Button
            content="Cancel"
            floated="right"
            negative
            onClick={this.handleClose}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default StudentEdit;
