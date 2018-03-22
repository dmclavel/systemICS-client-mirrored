import { Button, Input, Grid, Container, Segment, Image } from 'semantic-ui-react';
import { Icon, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import Course from './Course';
import img from './kobe.jpg';
const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};
class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  render() {
    const { open } = this.state;
    return (
      <Container>
          <Segment color="teal" secondary size="massive">
            <Grid>
              <Grid.Column width={5}>{this.props.name}</Grid.Column>
              <Grid.Column width={5}>{this.props.units}</Grid.Column>
              <Grid.Column width={5}>
                <Modal
                  open={open}
                  onOpen={this.open}
                  onClose={this.close}
                  size="small"
                  style={inlineStyle.modal}
                  trigger={
                    <Button icon size="tiny" floated="right" circular={true}>
                      <Icon name="large pencil alternate icon" />
                    </Button>
                  }>
                  <Modal.Header>                    
                    <Grid>
                      <Grid.Row>  
                        <Image floated='left' avatar src={ img } />
                        {this.props.name}
                      </Grid.Row>
                    </Grid>
                   </Modal.Header>
                  <Modal.Content>
                    <Grid centered={true}>
                      <Grid.Row>
                         <div>
                            <Input
                              placeholder="Type course to be added"
                              type="text"
                              action="Add course"
                            />
                          </div>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={16}>
                          <Course
                            subject="CMSC 128"
                            room="PC LAB 8"
                            day="M"
                            time="1:00-4:00"
                          />
                          <Course
                            subject="CMSC 170"
                            room="PC LAB 4"
                            day="T"
                            time="4:00-7:00"
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      icon="check"
                      content="All Done"
                      onClick={this.close}
                    />
                  </Modal.Actions>
                </Modal>
              </Grid.Column>
            </Grid>
            </Segment>
      </Container>
    );
  }
}
export default Information;
