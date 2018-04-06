import React, { Component } from 'react';
import { Button, Grid, Container, Icon, Segment } from 'semantic-ui-react';
import DeleteModal from './DeleteModal';

class Course extends Component {
  unlinkCourseOffering(e) {}

  render() {
    return (
      <div>
        <Container>
          <div>
            <Grid>
              {
                //may subject din dapat dito
              }
              <Grid.Row>
                <Grid.Column width={3}>{this.props.course_name}</Grid.Column>
                <Grid.Column width={1}>{this.props.section}</Grid.Column>
                <Grid.Column width={2}>{this.props.room}</Grid.Column>
                <Grid.Column width={2}>{this.props.day}</Grid.Column>
                <Grid.Column width={4}>{this.props.time}</Grid.Column>
                <Grid.Column width={2}>
                  <Icon name="users" />
                  {this.props.no_of_students + '  '}
                </Grid.Column>
                <Grid.Column width={2}>
                  <DeleteModal
                    course_offering_id={this.props.course_offering_id}
                    button={
                      <Button basic circular icon="trash outline" size="mini" />
                    }
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}

export default Course;
