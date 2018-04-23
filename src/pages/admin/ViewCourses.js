import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import './ViewCourses.css';
import config from './../../config.json';

class ViewCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: config.backendAddress,
      courses: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const socket = socketIOClient(this.state.address);
    const data = { email: 'jcgaza@up.edu.ph' };
    socket.emit('view_existing_courses', data);
    socket.on('view_existing_courses', result => {
      this.setState({ courses: result });
    });
  };

  handleDelete = e => {
    const socket = socketIOClient(this.state.address);
    const data = {
      email: 'jcgaza@up.edu.ph',
      course_id: e.target.value
    };
    socket.emit('remove_course', data);

    this.props.handleMessage(
      `${e.target.name} has been successfully deleted!`,
      false
    );

    this.fetchData();
  };

  handleEdit = e => {
    this.props.handleCourseID(e.target.id);
    this.props.handleCourseName(e.target.name);
    this.props.handleCourseTitle(e.target.title);
    this.props.handleCourseDesc(e.target.value);
    this.props.handleIsEditing(true);
  };

  render() {
    const { courses } = this.state;
    return (
      <div>
        <Table className="remove-margin">
          <Table.Header textAlign="center">
            <Table.HeaderCell width={3}>Course ID</Table.HeaderCell>
            <Table.HeaderCell width={4}>Course Title</Table.HeaderCell>
            <Table.HeaderCell width={5}>Course Description</Table.HeaderCell>
            <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
          </Table.Header>
        </Table>
        <div className="courses-table">
          <Table>
            <Table.Body fluid>
              {courses.map(course => {
                return (
                  <Table.Row>
                    <Table.Cell width={3}>{course.course_name}</Table.Cell>
                    <Table.Cell width={4}>{course.course_title}</Table.Cell>
                    <Table.Cell width={5}>{course.description}</Table.Cell>
                    <Table.Cell width={2}>
                      <Button
                        basic
                        circular
                        color="blue"
                        icon="edit"
                        name={course.course_name}
                        title={course.course_title}
                        value={course.description}
                        id={course.course_id}
                        onClick={this.handleEdit}
                      />
                      <Button
                        basic
                        circular
                        color="red"
                        icon="close"
                        value={course.course_id}
                        name={course.course_name}
                        onClick={this.handleDelete}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

export default ViewCourses;
