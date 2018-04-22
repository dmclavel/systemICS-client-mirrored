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
class AddFaculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email_add: '',
      isRegCom: '',
      status: '',
      emp_no: '',
      modalOpen: false,
      options: [ { key: 'Faculty', value: 0, text: 'Faculty' }, { key: 'Admin', value: 2, text: 'Admin' }, { key: 'Registration Committee', value: 1, text: 'Registration Committee' }, ],
      address: 'https://sleepy-falls-95372.herokuapp.com/'
    };
    autobind(this);
  }

  handleName = (e) => {
    this.setState({name: e.target.value});
  }

  handleNumber = (e) => {
    this.setState({emp_no: e.target.value});
  }

  handleEmail = (e) => {
    this.setState({email_add: e.target.value});
  }

  handleAccessLevel = (event: SyntheticEvent, data: object) => {
    this.setState({isRegCom: data.value});
  }

  handleStatus = (e) => {
    this.setState({status: e.target.value});
  }

  handleSubmit = (e) => {
    const socket = socketIOClient(this.state.address); //establish connection to the server
    socket.emit('create_faculty', {emp_no: this.state.emp_no, name: this.state.name, email_add: this.state.email_add, status: this.state.status, isRegCom: this.state.isRegCom}); //send data to 'login' endpoint in server
    socket.on('create_faculty', returnValueFromServer => {
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
       <Modal closeIcon size='large' style={inlineStyle.modal} trigger={<Button color="teal" onClick={this.handleOpen} open={this.state.modalOpen}
        onOpen={this.handleOpen} onClose={this.handleClose}> Add Faculty </Button>} basic>
            <Modal.Content>
              <Container>
                <Segment padded="very">
                    <Form>
                      <Form.Group>
                        <Form.Input fluid label='Employee Number' placeholder='Name' onChange={this.handleNumber}/>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='Name' placeholder='Name' onChange={this.handleName}/>
                        <Form.Input fluid label='Email address' placeholder='Email address' onChange={this.handleEmail}/>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Dropdown fluid label = "Access Level" placeholder='Access Level' search selection options={this.state.options} onChange={this.handleAccessLevel}/>
                        <Form.Input fluid label='Status' placeholder='Status' onChange={this.handleStatus}/>
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
