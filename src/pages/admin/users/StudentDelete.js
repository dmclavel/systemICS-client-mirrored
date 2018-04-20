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

class StudentDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    autobind(this);
  }

  handleDelete = (e) => {
    alert("Deleting student....");
  }

  handleCancel = (e) => {
    alert("Cancelling deletion..");
  }
  render() {
    return(
       <Modal size='large' style={inlineStyle.modal} trigger={<Button icon="x" negative/>} basic>
            <Modal.Content>
              <Container>
                <Segment padded="very">
                    <h2>
                     Are you sure you want to delete {this.props.name}?
                    </h2>
                      <Grid.Row>
                        <Form>
                          <Button negative content="Delete" floated="right" positive onClick={this.handleDelete}/ >
                          <Button positive content="Cancel" floated="right" positive onClick={this.handleCancel}/ >
                        </Form>
                    </Grid.Row>
                      
                </Segment>
              </Container>
            </Modal.Content>
       </Modal>
    );
  }
}

export default StudentDelete;
