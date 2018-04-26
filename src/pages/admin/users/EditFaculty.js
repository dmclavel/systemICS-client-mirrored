import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Dropdown } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import ErrorMessage from './ErrorMessage';
import config from './../../../config.json';

const statusOptions = [
  { key: 'Active', value: 'Active', text: 'Active' },
  { key: 'Resigned', value: 'Resigned', text: 'Resigned' },
  { key: 'On Leave', value: 'On Leave', text: 'On Leave' }
];

const inlineStyle = {
  modal: {
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
      isErrorName: false,
      isErrorMail: false,
      isErrorAccessLevel: false,
      isErrorStatus: false,
      isErrorMessage: false,
      getAccessLevel:
        this.props.isRegCom === 1
          ? 'Faculty'
          : this.props.isRegCom === 2
            ? 'Registration Committee'
            : 'Admin'
    };
    autobind(this);
  }

  handleName = e => {
    if (e.target.value !== '') {
      this.setState({ isErrorName: false });
    } else {
      this.setState({ isErrorName: true });
    }
    this.setState({ name: e.target.value });
  };

  handleEmail = e => {
    if (e.target.value !== '') {
      this.setState({ isErrorMail: false });
    } else {
      this.setState({ isErrorMail: true });
    }
    this.setState({ email_add: e.target.value });
  };

  handleAccessLevel = (event: SyntheticEvent, data: object) => {
    if (event.target.value !== '') {
      this.setState({ isErrorAccessLevel: false });
    } else {
      this.setState({ isErrorAccessLevel: true });
    }
    this.setState({ isRegCom: data.value });
  };

  handleStatus = (event: SyntheticEvent, data: object) => {
    if (event.target.value !== '') {
      this.setState({ isErrorStatus: false });
    } else {
      this.setState({ isErrorStatus: true });
    }
    this.setState({ status: data.value });
  };

  handleSubmit = e => {
    if (
      this.state.isErrorStatus === false &&
      this.state.isErrorAccessLevel === false &&
      this.state.isErrorMail === false &&
      this.state.isErrorName === false
    ) {
      const socket = socketIOClient(this.state.address); //establish connection to the server
      socket.emit('modify_faculty', {
        emp_no: this.state.emp_no,
        name: this.state.name,
        email_add: this.state.email_add,
        status: this.state.status,
        isRegCom: this.state.isRegCom
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
        trigger={<Button icon="pencil" color="teal" />}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={this.state.modalOpen}
      >
        <Modal.Header>Edit Faculty</Modal.Header>
        <Modal.Content>
          {this.state.isErrorMessage == true ? <ErrorMessage /> : <div />}
          <Form>
            <Form.Group>
              <Form.Input
                width={4}
                disabled
                label="Employee Number"
                value={this.props.emp_no}
              />
              <Form.Input
                width={12}
                error={this.state.isErrorName}
                fluid
                label="Name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleName}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                error={this.state.isErrorMail}
                fluid
                label="Email address"
                placeholder="Email Address"
                value={this.state.email_add}
                onChange={this.handleEmail}
              />
              <Form.Dropdown
                error={this.state.isErrorAccessLevel}
                fluid
                label="Access Level"
                value={this.state.getAccessLevel}
                selection
                placeholder="Access Level"
                options={this.state.options}
                onChange={this.handleAccessLevel}
              />
              <Form.Dropdown
                options={statusOptions}
                error={this.state.isErrorStatus}
                fluid
                label="Status"
                selection
                value={this.state.status}
                placeholder="Status"
                onChange={this.handleStatus}
              />
            </Form.Group>
          </Form>{' '}
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

export default EditFaculty;
