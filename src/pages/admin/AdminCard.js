import React, { Component } from 'react';
import { Grid, Header, Table, Input, Dimmer, Loader } from 'semantic-ui-react';
import CourseRow from './CourseRow';
import AddCourseModal from './AddCourseModal';
import AddLectureSection from './AddLectureSection';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';
import './AdminCard.css';

class AdminCard extends Component {
  constructor() {
    super();

    this.state = {
      address: 'https://sleepy-falls-95372.herokuapp.com/',
      coursesX: [],
      courses: [],
      course_offering_id: '',
      course_title: '',
      emp_no: '',
      acad_year: '',
      semester: '',
      no_of_students: '',
      course_name: '',
      time_start: '',
      time_end: '',
      room: '',
      day: '',
      section: '',
      unit: '',
      max_capacity: '',
      description: '',
      searchQuery: '',
      loading: true
    };
    autobind(this);
  }

  // next time, specify acad year and semester based on view
  componentDidMount() {
    this.setState({ loading: true });
    const socket = socketIOClient(this.state.address);
    const data = { email: 'pvgrubat@up.edu.ph', acad_year: 2015, semester: 1 };
    socket.emit('view_sections', data);
    socket.on('view_sections', course => {
      this.setState({ coursesX: course, loading: false });
    });
  }

  fetchCourse = () => {
    const socket = socketIOClient(this.state.address);
    const data = { email: 'pvgrubat@up.edu.ph', acad_year: 2015, semester: 1 };
    socket.emit('view_sections', data);
    socket.on('view_sections', course => {
      this.setState({ coursesX: course });
    });
  };

  handleSearch(e) {
    this.setState({ searchQuery: e.target.value });
  }

  render() {
    const { loading, coursesX } = this.state;

    console.log(loading);

    return (
      <div>
        <Grid className="admin-container">
          <Grid.Row>
            <Header as="h1" textAlign="left">
              Course Offering
            </Header>
          </Grid.Row>

          <Loader active={loading} content="Loading..." />

          {!loading && (
            <div className="admin-card-main">
              <Grid.Row className="admin-card-header">
                <Grid.Column className="admin-card-input">
                  <Input icon="search" fluid />
                </Grid.Column>
                <Grid.Column className="admin-card-input">
                  <AddCourseModal fetchCourse={this.fetchCourse} />
                  <AddLectureSection fetchCourse={this.fetchCourse} />
                </Grid.Column>
              </Grid.Row>

              <Table textAlign="center" className="remove-padding">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Course Code</Table.HeaderCell>
                    <Table.HeaderCell>Section</Table.HeaderCell>
                    <Table.HeaderCell>Day</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                    <Table.HeaderCell>Room</Table.HeaderCell>
                    <Table.HeaderCell>Max Capacity</Table.HeaderCell>
                    <Table.HeaderCell>Students</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {coursesX
                    .filter(course => {
                      if (
                        course.course_name
                          .toLowerCase()
                          .includes(this.state.searchQuery.toLowerCase())
                      ) {
                        return true;
                      }
                      return false;
                    })
                    .map((course, index) => {
                      return (
                        <CourseRow
                          key={index}
                          fetch_Course={this.fetchCourse}
                          description={course.description}
                          course={course.course_id}
                          coursecode={course.course_name}
                          day={course.day}
                          section={course.section}
                          time_start={course.time_start}
                          time_end={course.time_end}
                          room={course.room}
                          section_type={course.section_type}
                          maxcapacity={course.max_capacity}
                          status={course.status}
                          students={course.no_of_students}
                          acadyear={course.acad_year}
                          sem={course.semester}
                          unit={course.unit}
                          title={course.course_title}
                          empno={course.emp_no}
                          courseoffering={course.course_offering_id}
                        />
                      );
                    })}
                </Table.Body>
              </Table>
            </div>
          )}
        </Grid>
      </div>
    );
  }
}

export default AdminCard;
