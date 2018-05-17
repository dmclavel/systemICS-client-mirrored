import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import ErrorMessage from './ErrorMessage';
import config from './../../../config.json';
import Successful from './Successful';
import Unsuccessful from './Unsuccessful';

const inlineStyle = {
  modal: {
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
      address: config.backendAddress,
      isErrorName: false,
      isErrorMail: false,
      isErrorCurriculum: false,
      isErrorStatus: false,
      isErrorNumber: false,
      isErrorMessage: false,
      isDisplayPrompt: false,
      isAddSuccess: false,
      numberOfClicks: 0,
      isSubmitLoading: false,
      statusOptions: [
        { key: 'Enrolled', value: 'Enrolled', text: 'Enrolled' },
        { key: 'Unenrolled', value: 'Unenrolled', text: 'Unenrolled' }
      ],
      addStudentLabel: 'Add Student'
    };
    autobind(this);
  }

  handleName = e => {
    if (e.target.value.length !== 0) {
      var regex = /^[a-zA-Z][a-zA-Z\s]+$/;
      var isValid = regex.test(e.target.value);
      if (isValid) {
        this.setState({ isErrorName: false });
      } else {
        this.setState({ isErrorName: true });
      }
    } else {
      this.setState({ isErrorName: true });
    }
    this.setState({ name: e.target.value });
  };

  handleEmail = e => {
    if (e.target.value.length !== 0) {
      this.setState({ isErrorMail: false });
      var re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValid = re.test(e.target.value);
      if (!isValid) {
        this.setState({ isErrorMail: true });
      }
    } else {
      this.setState({ isErrorMail: true });
    }
    this.setState({ email_add: e.target.value });
  };

  handleCurriculum = e => {
    if (e.target.value.length !== 0) {
      this.setState({ isErrorCurriculum: false });
    } else {
      this.setState({ isErrorCurriculum: true });
    }
    this.setState({ curriculum: e.target.value });
  };

  handleStatus = (event: SyntheticEvent, data: object) => {
    this.setState({ status: data.value });
    this.setState({ isErrorStatus: false });
  };

  handleNumber = e => {
    var reg = /^[0-9]+$/;
    if (e.target.value.length !== 9 || !reg.test(e.target.value)) {
      this.setState({ isErrorNumber: true });
    } else {
      this.setState({ isErrorNumber: false });
    }
    this.setState({ student_number: e.target.value });
  };

  handleSubmit = e => {
    const { name, email_add, curriculum, status, student_number } = this.state;

    if (!name || !email_add || !curriculum || !status || !student_number) {
      if (!name) this.setState({ isErrorName: true });
      if (!email_add) this.setState({ isErrorMail: true });
      if (!curriculum) this.setState({ isErrorCurriculum: true });
      if (!status) this.setState({ isErrorStatus: true });
      if (!student_number) this.setState({ isErrorNumber: true });
      this.setState({ isErrorMessage: true });
    } else {
      this.setState({ isSubmitLoading: true });
      const socket = socketIOClient(this.state.address); //establish connection to the server
      socket.emit('create_student', {
        student_number: this.state.student_number,
        name: this.state.name,
        email_add: this.state.email_add,
        status: this.state.status,
        curriculum: this.state.curriculum
      }); //send data to 'login' endpoint in server
      socket.on('create_student', returnValueFromServer => {
        console.log(returnValueFromServer);
        this.setState({ isSubmitLoading: false });
        if (returnValueFromServer.success) {
          this.setState({ isAddSuccess: true });
          this.setState({ numberOfClicks: 1 });
          this.setState({ addStudentLabel: 'All Done' });
        } else {
          this.setState({ isAddSuccess: false });
        }
        this.setState({ isDisplayPrompt: true });
        this.setState({ isErrorMessage: false });
      });
    }
  };

  handleClose = e => {
    this.setState({ modalOpen: false });
  };

  handleOpen = e => {
    this.setState({ modalOpen: true });
    this.setState({ isErrorMessage: false });
    this.setState({ isDisplayPrompt: false });
    this.setState({ name: '' });
    this.setState({ email_add: '' });
    this.setState({ curriculum: '' });
    this.setState({ status: '' });
    this.setState({ student_number: '' });
  };

  render() {
    return (
      <Modal
        closeIcon
        size="large"
        style={inlineStyle.modal}
        trigger={<Button positive>Add Student</Button>}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={this.state.modalOpen}
      >
        <Modal.Header>Add Student</Modal.Header>
        <Modal.Content>
          {this.state.isErrorMessage && <ErrorMessage />}
          {this.state.isDisplayPrompt &&
            this.state.isAddSuccess && <Successful />}
          {this.state.isDisplayPrompt &&
            !this.state.isAddSuccess && <Unsuccessful />}
          <Form>
            <Form.Group>
              <Form.Input
                type="number"
                width={5}
                error={this.state.isErrorNumber}
                fluid
                label="Student Number"
                placeholder="e. g. xxxxxxxxx"
                onChange={this.handleNumber}
              />
              <Form.Input
                width={11}
                error={this.state.isErrorName}
                fluid
                label="Name"
                placeholder="e. g. Juan Dela Cruz"
                onChange={this.handleName}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                error={this.state.isErrorMail}
                fluid
                label="Email address"
                placeholder="e. g. cmg@gmail.com"
                onChange={this.handleEmail}
              />
              <Form.Input
                error={this.state.isErrorCurriculum}
                fluid
                label="Curriculum"
                placeholder="e. g. 1-C"
                onChange={this.handleCurriculum}
              />
              <Form.Dropdown
                error={this.state.isErrorStatus}
                fluid
                label="Status"
                placeholder="Select Status"
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
            loading={this.state.isSubmitLoading}
            content={this.state.addStudentLabel}
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

export default StudentAdd;
