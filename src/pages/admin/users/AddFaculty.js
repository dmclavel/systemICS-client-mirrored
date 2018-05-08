import React, { Component } from 'react';
import {
  Button,
  Modal,
  Form
} from 'semantic-ui-react';
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
      isDisplayPrompt: false,
      isAddSuccess: false,
      numberOfClicks: 0,
      isSubmitLoading: false,
      addFacultyLabel: "Add Faculty",
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
    var reg = /^[0-9]+$/;
    if (e.target.value.length !== 11 || !reg.test(e.target.value)){
       this.setState({isErrorNumber: true});
    }else{
      this.setState({isErrorNumber: false});
    }  
    this.setState({emp_no: e.target.value});
  };

  handleEmail = e => {
    if (e.target.value.length !== 0) {
      var regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    if (this.state.numberOfClicks == 0){
      this.setState({isSubmitLoading: true});
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
          this.setState({isSubmitLoading: false});
          if (returnValueFromServer.success){
            this.setState({isAddSuccess: true});
            this.setState({numberOfClicks: 1});
            this.setState({addFacultyLabel: "All Done"});
          }else{
            this.setState({isAddSuccess: false});
          }
          this.setState({isDisplayPrompt: true});
          this.setState({isErrorMessage: false});
        });
        this.props.fetchData();
       
      } else {
        this.setState({ isErrorMessage: true });
      }
    }

    }else{
      this.handleClose();
      this.setState({numberOfClicks: 0});
      this.setState({isDisplayPrompt: false});
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
          {this.state.isDisplayPrompt && this.state.isAddSuccess && <Successful/>}
          {this.state.isDisplayPrompt && !this.state.isAddSuccess && <Unsuccessful/>}
          <Form>
            <Form.Group>
              <Form.Input
                type="number"
                width={5}
                min="1" step="1"
                error={this.state.isErrorNumber}
                fluid
                label="Employee Number"
                placeholder="e.g. xxxxxxxxxxx"
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
            content={this.state.addFacultyLabel} loading={this.state.isSubmitLoading}
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
