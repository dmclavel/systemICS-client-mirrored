import {
  Button,
  Grid,
  Container,
  Segment,
  Header,
} from 'semantic-ui-react';
import React, { Component } from 'react';
import EditLoadModal from './EditLoadModal';

class Information extends Component {
  render() {
    const { emp_no, name, room, email_add, teachingLoad } = this.props.object;
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
                        content={email_add}
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
                <EditLoadModal
                  emp_no={emp_no}
                  button={<Button content="Edit Load" basic />}
                  name={name}
                  room={room}
                  teachingLoad={email_add}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}
export default Information;
