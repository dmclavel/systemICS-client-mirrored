import React, { Component } from 'react';
import { Grid, Header, Table, Loader, Pagination, Icon } from 'semantic-ui-react';

import SearchCard from '../../components/SearchCard';
import CourseRow from './CourseRow';
import AddCourseModal from './AddCourseModal';
import AddLectureSection from './AddLectureSection';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';
import './AdminCard.css';
import config from './../../config.json';
import debounce from 'debounce'

class AdminCard extends Component {
  constructor() {
    super();

    this.state = {
      address: config.backendAddress,
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
      loading: true,
      current_year: 0,
      current_sem: 0,
      add: true,
      page: 0,
      totalPages: 0,
      sliced_courses: []
    };
    autobind(this);
  }

  // next time, specify acad year and semester based on view
  componentWillReceiveProps(nextProps) {
    this.setState({ add: true });
    this.setState({ loading: true });
    const socket = socketIOClient(this.state.address);
    const data = {
      acad_year: nextProps.current_year,
      semester: nextProps.current_sem
    };

    socket.emit('view_sections', data);
    socket.on('view_sections', course => {
      this.setState({
        coursesX: course,
        courses: course
      });
      this.setState({
        loading: false
      });
    });

    socket.on('update_alert', res => {
      if (res.code === 'section') {
        socket.emit('view_sections', data);
        this.setState({ page: 1 });
      }
    });

    this.setState({
      current_year: nextProps.current_year,
      current_sem: nextProps.current_sem
    });
  }
  fetchCourse = () => {
    const socket = socketIOClient(this.state.address);
    const data = {
      acad_year: this.props.current_year,
      semester: this.props.current_sem
    };
    socket.emit('view_sections', data);
    socket.on('view_sections', course => {
      this.setState({ coursesX: course });
    });
  };
  handleSearch = query => {
    if (query.length === 0) {
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
  };

  handlePageChange = (e, { activePage }) => {
    this.setState({
      page: activePage
    });
  };

  render() {
    const {
      loading,
      coursesX,
      current_year,
      current_sem,
      page,
      totalPages
    } = this.state;

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
              placeholder="Search course name"
              handleSearch={ debounce(this.handleSearch,config.searchDelay) }
              fluid={true}
            />
          </Grid.Column>

          <Grid.Column width={3}>
            <AddCourseModal fetchCourse={this.fetchCourse} />
          </Grid.Column>
          <Grid.Column width={3}>
            <AddLectureSection data={coursesX} fetchCourse={this.fetchCourse} />
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
                  data={coursesX}
                  key={index}
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
                  current_year={current_year}
                  current_sem={current_sem}
                  fetchCourse={this.fetchCourse}
                />
              );
            })}
          </Table.Body>
        </Table>

    {/*
      !loading &&
          this.state.courses.length > 10 && (
            <Pagination
              fluid
              defaultActivePage={page + 1}
              totalPages={totalPages}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
              activePage={page}
              onPageChange={this.handlePageChange}
            />
          )
        */}
      </Grid>
    );
  }
}

export default AdminCard;
