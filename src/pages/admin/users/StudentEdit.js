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
class StudentEdit extends Component {
  render() {
    return(
       <Modal size='large' style={inlineStyle.modal} trigger={<Button icon="pencil" positive/>} basic>
            <Modal.Content>
              <Container>
                <Segment padded="very">
                    <Form>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='Name' placeholder={this.props.name} />
                        <Form.Input fluid label='Email address' placeholder={this.props.email_add} />
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Input fluid label='Curriculum' placeholder={this.props.curriculum} />
                        <Form.Input fluid label='Status' placeholder={this.props.status} />
                      </Form.Group>
                    </Form>
                    <h2>
                     Are you sure you want to edit {this.props.name}?
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

export default StudentEdit;
