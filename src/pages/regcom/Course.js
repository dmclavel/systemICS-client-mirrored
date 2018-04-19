import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import DeleteModal from './DeleteModal';
import './RegCom.css';
class Course extends Component {
  render() {
    const {
      course_name,
      section,
      room,
      day,
      time,
      no_of_students,
      course_offering_id,
      name
    } = this.props;
    return (
      <Table.Row>
        <Table.Cell width={3}>{course_name}</Table.Cell>
        <Table.Cell width={2}>{section}</Table.Cell>
        <Table.Cell width={2}>{room}</Table.Cell>
        <Table.Cell width={2}>{day}</Table.Cell>
        <Table.Cell width={2}>{time}</Table.Cell>
        <Table.Cell width={2}>{no_of_students}</Table.Cell>
        <Table.Cell width={2}>
          <DeleteModal
            name={name}
            section={section}
            course_name={course_name}
            alertMessage={this.props.alertMessage}
            course_offering_id={course_offering_id}
            button={<Button basic icon="trash outline" size="mini" negative />}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Course;
