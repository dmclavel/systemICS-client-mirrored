import {
  Button,
  Input,
  Grid,
  Container,
  Segment,
  Image,
  Header,
  Dropdown
} from 'semantic-ui-react';
import { Icon, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import Course from './Course';
import img from './kobe.jpg';
import autobind from 'react-autobind';

// TODO:
const inlineStyle = {
  modal: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

const options = [
  {
    key: 1,
    value: 'cs22',
    text: 'CMSC 22 - Intro to OOP'
  },
  {
    key: 1,
    value: 'cs22',
    text: 'CMSC 22 - Intro to OOP'
  },
  {
    key: 1,
    value: 'cs22',
    text: 'CMSC 22 - Intro to OOP'
  }
];
class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    autobind(this);
  }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { name, room, numStudents, teachingLoad } = this.props.object;
    return (
      <Container>
        <Segment>
          <Grid divided>
            <Grid.Row>
              <Grid.Column width={2}>
                <Segment inverted circular />
              </Grid.Column>
              <Grid.Column width={10}>
                <Header textAlign="left">
                  <Header.Content>{name}</Header.Content>
                  <Header.Subheader>{room}</Header.Subheader>
                </Header>
                <Grid divided>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Header
                        textAlign="left"
                        size="tiny"
                        icon="users"
                        content={numStudents + ' students'}
                        subheader="Tentative"
                      />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Header
                        textAlign="left"
                        size="tiny"
                        icon="users"
                        content={teachingLoad + ' teaching load'}
                        subheader="Tentative"
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={3} verticalAlign="middle">
                <Modal
                  open={open}
                  onOpen={this.open}
                  onClose={this.close}
                  size="small"
                  style={inlineStyle.modal}
                  trigger={<Button content="Edit Load" basic />}>
                  <Modal.Header>
                    <Grid>
                      <Grid.Row>
                        <Image floated="left" avatar src={img} />
                        {name}
                      </Grid.Row>
                    </Grid>
                  </Modal.Header>
                  <Modal.Content>
                    <Grid centered={true}>
                      <Grid.Row>
                        <Grid.Column width={16}>
                          <Dropdown
                            placeholder="Select course"
                            fluid
                            search
                            selection
                            options={options}
                          />
                        </Grid.Column>
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
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}
export default Information;
