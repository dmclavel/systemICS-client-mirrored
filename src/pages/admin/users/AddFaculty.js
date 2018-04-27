import React, { Component } from 'react';
import {
  Button,
  Modal,
  Form,
  Grid,
  Header,
  Dropdown,
  Checkbox,
  Popup
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
      options: [
        { key: 'Faculty', value: 1, text: 'Faculty' },
        { key: 'Admin', value: 3, text: 'Admin' },
        {
          key: 'Registration Committee',
          value: 2,
          text: 'Registration Committee'
        }
      ],
      address: config.backendAddress,
      statusOptions: [
        { key: 'Active', value: 'Active', text: 'Active' },
        { key: 'Resigned', value: 'Resigned', text: 'Resigned' },
        { key: 'On Leave', value: 'On Leave', text: 'On Leave' }
      ],
      selectedStatus: [0],
      selectedisRegCom: [0]
    };
    autobind(this);
  }

  handleName = e => {
    if (e.target.value.length !== 0) {
      var regex =  /^[a-zA-Z][a-zA-Z\s]+$/;
      var isValid = regex.test(e.target.value);
      if (isValid){
        this.setState({ isErrorName: false});
      }else{
        this.setState({ isErrorName: true});
      }
    } else {
      this.setState({ isErrorName: true });
    }
    this.setState({ name: e.target.value });
  };

  handleNumber = e => {
    if (e.target.value.length !== 0) {
      var regex = /^\+?(0|[0-9]\d*){11}$/;
      var isValid = regex.test(e.target.value);
      if (isValid){
        this.setState({ isErrorNumber: false});
      }else{
        this.setState({ isErrorNumber: true});
      }
    } else {
      this.setState({ isErrorName: true });
    }
    this.setState({ emp_no: e.target.value });
  };

  handleEmail = e => {
    if (e.target.value.length !== 0) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isValid = regex.test(e.target.value);
      if (isValid){
        this.setState({ isErrorMail: false});
      }else{
        this.setState({ isErrorMail: true});
      }
    } else {
      this.setState({ isErrorMail: true });
    }
    this.setState({ email_add: e.target.value });
  };

  handleAccessLevel = (event: SyntheticEvent, data: object) => {
    this.setState({ isRegCom: data.value });
    this.setState({ isErrorReg: false });
  };

  handleStatus = (event: SyntheticEvent, data: object) => {
    this.setState({ status: data.value });
    this.setState({ isErrorStatus: false });
  };

  handleSubmit = e => {
    if (
      this.state.isRegCom === '' ||
      this.state.status === '' ||
      this.state.name === '' ||
      this.state.email_add === '' ||
      this.state.emp_no === ''
    ) {
      if (!this.state.isRegCom) {
        this.setState({ isErrorReg: true });
      }
      if (!this.state.status) {
        this.setState({ isErrorStatus: true });
      }
      if (!this.state.name) {
        this.setState({ isErrorName: true });
      }
      if (!this.state.email_add) {
        this.setState({ isErrorMail: true });
      }
      if (!this.state.emp_no) {
        this.setState({ isErrorNumber: true });
      }
      this.setState({ isErrorMessage: true });
    } else {
      if (
        !this.state.isErrorStatus &&
        !this.state.isErrorMail &&
        !this.state.isErrorNumber &&
        !this.state.isErrorName &&
        !this.state.isErrorReg
      ) {
        const socket = socketIOClient(this.state.address); //establish connection to the server
        socket.emit('create_faculty', {
          emp_no: this.state.emp_no,
          name: this.state.name,
          email_add: this.state.email_add,
          status: this.state.status,
          isRegCom: this.state.isRegCom
        }); //send data to 'login' endpoint in server
        socket.on('create_faculty', returnValueFromServer => {
          console.log(returnValueFromServer);
        });
        this.props.fetchData();
        this.handleClose();
      } else {
        this.setState({ isErrorMessage: true });
      }
    }
  };

  handleClose = e => {
    this.setState(null);
    this.setState({ modalOpen: false, isErrorMessage: false });
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
        trigger={
          <Button
            color="green"
            onClick={this.handleOpen}
            open={this.state.modalOpen}
            content="Add Faculty"
          />
        }
        open={this.state.modalOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add Faculty</Modal.Header>
        <Modal.Content>
          {this.state.isErrorMessage && <ErrorMessage />}
          <Form>
            <Form.Group>
              <Form.Input
                type="number"
                width={5}
                min="1" step="1"
                error={this.state.isErrorNumber}
                fluid
                label="Employee Number"
                placeholder="Employee number"
                onChange={this.handleNumber}
              />
              <Form.Input
                width={11}
                error={this.state.isErrorName}
                fluid
                label="Name"
                placeholder="Name"
                onChange={this.handleName}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                error={this.state.isErrorMail}
                fluid
                label="Email address"
                placeholder="Email address"
                onChange={this.handleEmail}
              />
              <Form.Dropdown
                error={this.state.isErrorReg}
                fluid
                label="Access Level"
                placeholder="Select Access Level"
                search
                selection
                options={this.state.options}
                onChange={this.handleAccessLevel}
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
            content="Add Faculty"
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

export default AddFaculty;
