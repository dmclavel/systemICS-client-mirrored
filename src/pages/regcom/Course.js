import React, { Component } from 'react';
import { Button, Grid, Container, Icon } from 'semantic-ui-react';
import DeleteModal from './DeleteModal';

class Course extends Component {
  render() {
    const {
      course_name,
      section,
      room,
      day,
      time,
      no_of_students,
      course_offering_id
    } = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>{course_name}</Grid.Column>
            <Grid.Column width={2}>{section}</Grid.Column>
            <Grid.Column width={2}>{room}</Grid.Column>
            <Grid.Column width={2}>{day}</Grid.Column>
            <Grid.Column width={4}>{time}</Grid.Column>
            <Grid.Column width={2}>
              <Icon name="users" />
              {no_of_students + '  '}
            </Grid.Column>
            <Grid.Column width={1}>
              <DeleteModal
                course_offering_id={course_offering_id}
                button={
                  <Button
                    basic
                    circular
                    icon="trash outline"
                    size="mini"
                    negative
                  />
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Course;
