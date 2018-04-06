import React, { Component } from 'react';
import {
  Modal,
  Grid,
  Image,
  Dropdown,
  Button,
  Segment,
  Header
} from 'semantic-ui-react';
import Course from './Course';
import img from './kobe.jpg';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
//TODO: make 1.!inline -> css
//2.place teachingload at right
const inlineStyle = {
  modal: {
    marginTop: '250px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

const options = [
  {
    key: 1,
    value: 'cs22',
    text: 'CMSC 22 - Intro to OOP'
  },
  {
    key: 2,
    value: 'cs23',
    text: 'CMSC 22 - Intro to OOP'
  },
  {
    key: 3,
    value: 'cs24',
    text: 'CMSC 22 - Intro to OOP'
  }
];

const courses = [
  {
    subject: 'CMSC 170',
    room: 'Fertility Tree',
    day: 'Sunday',
    time: '4:00-7:00'
  },
  {
    subject: 'CMSC 57',
    room: 'PC LAB 4',
    day: 'Tuesday',
    time: '7:00-7:00'
  },
  {
    subject: 'PI 10',
    room: 'Luneta Park',
    day: 'Tuesday',
    time: '4:00-7:00'
  },
  {
    subject: 'CMSC 132',
    room: 'LB Square',
    day: 'Thursday',
    time: '4:00-7:00'
  },
  {
    subject: 'CMSC 128',
    room: 'C-114',
    day: 'Tuesday',
    time: '7:00-10:00'
  }
];

class EditLoadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codesAndDescription: [],
      selectedCodeAndDescriptionId: undefined,
      selectedCourseOfferingIds: [],
      timeAndSections: [],
      courses: [],
      open: false,
      endpoint: 'https://sleepy-falls-95372.herokuapp.com'
    };
    autobind(this);
  }
  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('update_alert', update => {
      socket.emit('view_all_active_courses_with_unlinked_sections', {});
      socket.emit('search_course_offerings_of_specific_faculty', {
        emp_no: this.props.emp_no
      });
    });
    socket.emit('view_all_active_courses_with_unlinked_sections', {});
    socket.on('view_all_active_courses_with_unlinked_sections', courses => {
      // const { course_name, course_title, time_start, time_end, section } = courses;
      let codesAndDescription = [];
      courses.forEach((course, index) => {
        const { course_name, course_title, course_id } = course;
        codesAndDescription.push({
          key: course_id,
          text: `${course_name} - ${course_title}`,
          value: `${course_id}`
        });
      });
      this.setState({
        codesAndDescription: codesAndDescription
      });
    });

    socket.emit('search_course_offerings_of_specific_faculty', {
      emp_no: this.props.emp_no
    });
    socket.on('search_course_offerings_of_specific_faculty', courses => {
      // const { course_name, course_title, time_start, time_end, section } = courses;
      this.setState({
        courses
      });
    });

    // to be deleted
  }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  handleAssignOnClick(e) {
    const socket = socketIOClient(this.state.endpoint);
    this.state.selectedCourseOfferingIds.forEach(course_offering_id => {
      socket.emit('link_course_offering', {
        emp_no: this.props.emp_no,
        course_offering_id
      });
    });
  }

  codesAndDescriptionHandleOnChange(e, data) {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('view_all_unlinked_course_offerings', {
      course_id: data.value
    });
    socket.on('view_all_unlinked_course_offerings', course_offerings => {
      // this.setState({ timeAndSections });
      let timeAndSections = [];
      course_offerings.forEach((course_offering, index) => {
        const { time_start, time_end, day, section } = course_offering;
        timeAndSections.push({
          key: index,
          text: `${section} - ${day} ${time_start}-${time_end}`,
          value: course_offering.course_offering_id
        });
      });
      // optional room
      this.setState({
        timeAndSections,
        selectedCodeAndDescriptionId: data.value
      });
    });
  }
  timeAndSectionsHandleOnChange(e, data) {
    this.setState({ selectedCourseOfferingIds: data.value });
  }
  render() {
    const { open } = this.state;

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        style={inlineStyle.modal}
        trigger={this.props.button}>
        <Modal.Header>
          <Grid centered={true}>
            <Grid.Row fluid>
              <Grid.Column width={3}>
                <Image floated="left" avatar src={img} />
              </Grid.Column>
              <Header textAlign="left">
                <Header.Content>{this.props.name}</Header.Content>
                <Header.Subheader>
                  <Header
                    textAlign="left"
                    size="tiny"
                    icon="users"
                    subheader={this.props.teachingLoad}
                  />
                </Header.Subheader>
              </Header>
            </Grid.Row>
          </Grid>
        </Modal.Header>
        <Modal.Content>
          <Grid centered={true}>
            <Grid.Row>
              <Grid.Column width={16}>
                <Dropdown
                  placeholder="Select course"
                  fluid
                  search
                  selection
                  options={this.state.codesAndDescription}
                  onChange={this.codesAndDescriptionHandleOnChange}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={13}>
                <Dropdown
                  multiple
                  search
                  selection
                  placeholder="Select section and time"
                  fluid
                  search
                  selection
                  options={this.state.timeAndSections}
                  onChange={this.timeAndSectionsHandleOnChange}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Button onClick={this.handleAssignOnClick}>ASSIGN</Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Segment>
                  <div
                    style={{
                      padding: '20px',
                      overflow: 'auto',
                      maxHeight: 200
                    }}>
                    {this.state.courses.map(course => {
                      return (
                        <Course
                          course_offering_id={course.course_offering_id}
                          no_of_students={course.no_of_students}
                          section={course.section}
                          course_name={course.course_name}
                          subject={course.subject}
                          room={course.room}
                          day={course.day}
                          time={`${course.time_start}-${course.time_end}`}
                          section={course.section}
                        />
                      );
                    })}
                  </div>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="All Done" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditLoadModal;
