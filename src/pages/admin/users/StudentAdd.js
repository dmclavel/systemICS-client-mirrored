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
class StudentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email_add: '',
      curriculum: '',
      status: ''
    };
    autobind(this);
  }

  handleName = (e) => {
    this.setState({name: e.target.value});
  }

  handleEmail = (e) => {
    this.setState({email_add: e.target.value});
  }

  handleCurriculum = (e) => {
    this.setState({curriculum: e.target.value});
  }

  handleStatus = (e) => {
    this.setState({status: e.target.value});
  }

  handleSubmit = (e) => {

  }


  render() {
    return(
       <Modal size='large' style={inlineStyle.modal} trigger={<Button positive> Add Student </Button>} basic>
            <Modal.Content>
              <Container>
                <Segment padded="very">
                    <Form>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='Name' placeholder='Name' onChange={this.handleName}/>
                        <Form.Input fluid label='Email address' placeholder='Email address' onChange={this.handleEmail}/>
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='Curriculum' placeholder='Curriculum' onChange={this.handleCurriculum}/>
                        <Form.Input fluid label='Status' placeholder='Status' onChange={this.handleStatus}/>
                      </Form.Group>
                    </Form>
                    <h2>
                     Are you sure you want to add new student {this.state.name}?
                    </h2>
                      <Grid.Row>
                        <Form>
                          <Button content="Confirm Changes" floated="right" positive onClick={this.handleSubmit}/ >
                          <Button content="Cancel" floated="right" negative onClick={this.handleSubmit}/ >
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
