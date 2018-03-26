import React, { Component } from 'react';
import { Button, Grid, Container, Icon } from 'semantic-ui-react';

class Course extends Component {
  render() {
    return (
      <div>
        <Container>
          <div>
            <Grid>
              <Grid.Column width={4}>{this.props.subject}</Grid.Column>
              <Grid.Column width={4}>{this.props.room}</Grid.Column>
              <Grid.Column width={3}>{this.props.day}</Grid.Column>
              <Grid.Column width={3}>{this.props.time}</Grid.Column>
              <Grid.Column width={1}>
                <Button basic class="ui icon">
                  <Icon color="red" name="trash outline" />
                </Button>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}

export default Course;
