import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import config from './../../config.json';

const inlineStyle = {
  modal: {
    marginTop: '35vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      endpoint: config.backendAddress
    };
    autobind(this);
  }
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
  handleOkay(e) {
    const { course_offering_id, course_name, section, name } = this.props;
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('modify_section_2', {
      course_offering_id,
      unassignFaculty: true
    });
    this.props.alertMessage(
      `Successfully unassigned subjects.`,
      `${course_name} ${section} has been unassigned from ${name}.`
    );
    this.handleClose();
  }
  render() {
    const { open } = this.state;
    const { button } = this.props;
    return (
      <div>
        <Modal
          size="tiny"
          onOpen={this.handleOpen}
          open={open}
          onClose={this.handleClose}
          trigger={button}
          style={inlineStyle.modal}
        >
          <Modal.Header>Delete Course</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete the course?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.handleClose}>
              No
            </Button>
            <Button
              positive
              onClick={this.handleOkay}
              icon="checkmark"
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;
