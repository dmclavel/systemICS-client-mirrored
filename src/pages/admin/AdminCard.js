import React, { Component } from 'react';
import { Grid, Header, Table, Input, Loader } from 'semantic-ui-react';
import SearchCard from '../../components/SearchCard';
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
      this.setState({ coursesX: course, courses: course });
      this.setState({ loading: false });
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

  handleSearch = query => {
    if (query.length == 0) {
      this.setState({ courses: this.state.coursesX });
    } else {
      this.setState({
        courses: this.state.coursesX.filter(section => {
          if (
            section.course_name
              .toLowerCase()
              .includes(query.toLowerCase().trim())
          ) {
            return true;
          } else {
            return false;
          }
        })
      });
    }
    console.log(this.state.visibleData);
  };

  render() {
    const { loading, coursesX } = this.state;

    console.log(loading);

    return (
      <Grid className="admin-container">
        <Grid.Row>
          <Header as="h1" textAlign="left">
            Course Offering
          </Header>
        </Grid.Row>

        <Loader active={loading} content="Loading..." />

        <Grid.Row width={16}>
          <Grid.Column width={10}>
            <SearchCard
              placeholder="search course name"
              handleSearch={this.handleSearch}
              fluid={true}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <AddCourseModal fetchCourse={this.fetchCourse} />
          </Grid.Column>
          <Grid.Column width={3}>
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
            {this.state.courses.map((course, index) => {
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
      </Grid>
    );
  }
}

export default AdminCard;
