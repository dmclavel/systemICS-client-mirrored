import React, { Component } from 'react';
import { Button, Grid, Container, Icon, Table } from 'semantic-ui-react';
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
      <Table.Row>
        <Table.Cell>{course_name}</Table.Cell>
        <Table.Cell>{section}</Table.Cell>
        <Table.Cell>{room}</Table.Cell>
        <Table.Cell>{day}</Table.Cell>
        <Table.Cell>{time}</Table.Cell>
        <Table.Cell>{no_of_students}</Table.Cell>
        <Table.Cell>
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
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Course;
