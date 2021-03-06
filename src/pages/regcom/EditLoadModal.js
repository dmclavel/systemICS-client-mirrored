import React, { Component } from 'react';
import {
  Modal,
  Grid,
  Image,
  Dropdown,
  Button,
  Header,
  Message,
  Label,
  Table,
  Loader,
  Dimmer
} from 'semantic-ui-react';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';
import Course from './Course';
import {
  isScheduleConflict,
  convertToGeneralTime
} from '../../utils/TimeUtilities';
import img from './kobe.jpg';
import config from './../../config.json';

// Modal inlineStyle to fix centering
const inlineStyle = {
  modal: {
    marginTop: '5vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class EditLoadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_offerings: [], // not yet used
      codesAndDescription: [], // list of options for courses
      selectedCourse: undefined, // value to retrieve from active courses dropdown
      selectedCourseOfferings: [], // values to retrieve from multiple time and section dropdown
      timeAndSections: [], // list of options for time and sections available for course
      courses: [], // courses assigned to a faculty
      open: false, // state of the modal
      endpoint: config.backendAddress, // endpoint
      coursesDropdownLoading: true,
      sectionsDropdownLoading: false,
      message: '',
      details: '',
      coursesDropdownError: false,
      sectionsDropdownError: false,
      conflict: false,
      warning: false,
      loading: true
    };
    autobind(this);
  }
  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    const { emp_no } = this.props;
    // For the client to be aware of the changes in the database
    socket.on('update_alert', update => {
      // These are all the emits that needs to be redone when update is available
      socket.emit('view_courses', {
        active: true,
        petitioned: true,
        additional: true,
        unassignedOnly: true
      });
      socket.emit('view_sections', {
        emp_no,
        active: true,
        petitioned: true,
        additional: true
      });
    });
    // Retrieve courses with unlinked sections
    socket.emit('view_courses', {
      active: true,
      petitioned: true,
      additional: true,
      unassignedOnly: true
    });
    socket.on('view_courses', courses => {
      let codesAndDescription = [];
      // For each courses, concat course name with course id e.g. CMSC 22 - Intro to OOP
      courses.forEach((course, index) => {
        const { course_name, course_title, course_id } = course;
        const value = JSON.stringify(course);
        codesAndDescription.push({
          key: course_id,
          text: `${course_name} - ${course_title}`,
          value
        });
      });
      this.setState({
        codesAndDescription,
        coursesDropdownLoading: false
      });
    });
    this.setState({ loading: true });
    // For a specific faculty show their assigned courses
    socket.emit('view_sections', {
      emp_no,
      active: true,
      petitioned: true,
      additional: true
    });
    socket.on('view_sections', courses => {
      this.setState({
        courses,
        loading: false
      });
    });
  }
  // Modal methods
  handleOpen = () => {
    const socket = socketIOClient(this.state.endpoint);
    const { emp_no } = this.props;
    this.setState({ loading: true });
    // For a specific faculty show their assigned courses
    socket.emit('view_sections', {
      emp_no,
      active: true,
      petitioned: true,
      additional: true
    });
    socket.on('view_sections', courses => {
      this.setState({
        courses,
        loading: false
      });
    });
    this.setState({ open: true });
  };
  handleClose = () => this.setState({ open: false });

  // Assign course_offering_ids to a professor
  handleAssignOnClick(e) {
    if (!this.state.selectedCourse) {
      this.setState({
        coursesDropdownError: true,
        message: 'Some required field is missing',
        details: '',
        warning: true
      });
    }
    if (this.state.selectedCourseOfferings.length === 0) {
      this.setState({
        sectionsDropdownError: true,
        message: 'Some required field is missing',
        details: '',
        warning: true
      });
    }
    if (
      this.state.selectedCourse &&
      this.state.selectedCourseOfferings.length !== 0 &&
      !this.state.conflict
    ) {
      const socket = socketIOClient(this.state.endpoint);
      // For each id values from multiple dropdown, send it to the database
      //      to assign the employee with the course_offering
      let details = '';
      this.state.selectedCourseOfferings.forEach((course_offering, index) => {
        const value = JSON.parse(course_offering);
        details += `${value.course_name} ${value.section}`;
        if (index !== this.state.selectedCourseOfferings.length - 1) {
          details += ',';
        }
        socket.emit('modify_section_2', {
          emp_no: this.props.emp_no,
          course_offering_id: value.course_offering_id
        });
      });
      details += ` has been assigned to ${this.props.name}`;
      // Clear the values of the dropdown and multiple dropdown
      this.setState({
        selectedCourseOfferings: [],
        selectedCourse: undefined,
        timeAndSections: [],
        message: 'Successfully assigned subjects!',
        details,
        warning: false
      });
    }
  }

  codesAndDescriptionHandleOnChange(e, data) {
    this.setState({
      sectionsDropdownLoading: true,
      conflict: false,
      message: '',
      details: ''
    });
    const socket = socketIOClient(this.state.endpoint);
    const value = JSON.parse(data.value);
    socket.emit('view_sections', {
      course_id: value.course_id,
      active: true,
      petitioned: true,
      additional: true,
      unassignedOnly: true
    });

    // socket.emit('view_sections', {
    //   course_id: value.course_id,
    //   unassignedOnly: true,
    //   acad_year:
    //   semester:
    // });

    socket.on('view_sections', course_offerings => {
      let timeAndSections = [];
      course_offerings.forEach((course_offering, index) => {
        const { time_start, time_end, day, section } = course_offering;
        const value = JSON.stringify(course_offering);
        timeAndSections.push({
          key: index,
          text: `${section} - ${day} ${convertToGeneralTime(
            time_start
          )}-${convertToGeneralTime(time_end)}`,
          value
        });
      });
      this.setState({
        course_offerings,
        timeAndSections,
        selectedCourse: data.value,
        sectionsDropdownLoading: false,
        coursesDropdownError: false,
        selectedCourseOfferings: []
      });
    });
  }
  timeAndSectionsHandleOnChange(e, data) {
    let conflict = false;
    let details = '';
    for (let i = 0; i < data.value.length; i++) {
      if (conflict) break;
      const source = JSON.parse(data.value[i]);
      const {
        day: source_days,
        time_start: source_time_start,
        time_end: source_time_end
      } = source;
      for (let j = 0; j < i; j++) {
        const target = JSON.parse(data.value[j]);
        const {
          day: target_days,
          time_start: target_time_start,
          time_end: target_time_end
        } = target;
        const arg1 = {
          day: source_days,
          time_start: source_time_start,
          time_end: source_time_end
        };
        const arg2 = {
          day: target_days,
          time_start: target_time_start,
          time_end: target_time_end
        };
        if (isScheduleConflict(arg1, arg2)) {
          conflict = true;
          details += `${source.course_name} ${
            source.section
          } has a conflict with ${target.course_name} ${target.section}`;
          break;
        }
      }
      for (let j = 0; j < this.state.courses.length; j++) {
        if (conflict) break;
        const target = this.state.courses[j];
        const {
          day: target_days,
          time_start: target_time_start,
          time_end: target_time_end
        } = target;
        const arg1 = {
          day: source_days,
          time_start: source_time_start,
          time_end: source_time_end
        };
        const arg2 = {
          day: target_days,
          time_start: target_time_start,
          time_end: target_time_end
        };
        if (isScheduleConflict(arg1, arg2)) {
          conflict = true;
          details += `${source.course_name} ${
            source.section
          } has a conflict with ${target.course_name} ${target.section}`;
          break;
        }
      }
    }
    if (conflict) {
      this.setState({
        selectedCourseOfferings: data.value,
        conflict,
        message: 'Conflicting time schedules',
        details,
        warning: true
      });
    } else {
      this.setState({
        selectedCourseOfferings: data.value,
        sectionsDropdownError: false,
        message: '',
        details: '',
        warning: false,
        conflict
      });
    }
  }
  alertMessage(message, details) {
    this.setState({ message, details });
  }
  render() {
    const { open } = this.state;
    const { button, name, teaching_load, email_add } = this.props;
    const {
      selectedCourseOfferings,
      selectedCourse,
      timeAndSections,
      codesAndDescription,
      courses,
      coursesDropdownLoading,
      sectionsDropdownLoading,
      message,
      details,
      coursesDropdownError,
      sectionsDropdownError,
      warning,
      loading
    } = this.state;
    return (
      <Modal
        open={open}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        size="small"
        style={inlineStyle.modal}
        trigger={button}
        closeIcon
      >
        <Modal.Header>
          <Grid centered={true}>
            <Grid.Row fluid="true">
              <Grid.Column width={10}>
                <div>
                  <Image
                    verticalAlign="middle"
                    floated="left"
                    avatar
                    src={img}
                    size="mini"
                  />
                  <Header textAlign="left">
                    <Header.Content>{name}</Header.Content>
                    <Header.Subheader>
                      <Header
                        textAlign="left"
                        size="tiny"
                        icon="mail"
                        subheader={email_add}
                      />
                    </Header.Subheader>
                  </Header>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Header>
        <Modal.Content>
          <Grid centered={true}>
            {message && (
              <Grid.Row>
                <Grid.Column width={16}>
                  <Message warning={warning} success={!warning}>
                    <Message.Header>{message}</Message.Header>
                    {details && <p>{details}</p>}
                  </Message>
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row>
              <Grid.Column width={16}>
                <Dropdown
                  placeholder="Select course"
                  fluid
                  search
                  selection
                  options={codesAndDescription}
                  onChange={this.codesAndDescriptionHandleOnChange}
                  value={selectedCourse}
                  loading={coursesDropdownLoading}
                  noResultsMessage="No available courses found."
                  error={coursesDropdownError}
                />
              </Grid.Column>
              <br />
              <br />
              <br />

              <Grid.Column width={13}>
                <Dropdown
                  multiple
                  search
                  selection
                  placeholder="Select section and time"
                  fluid
                  value={selectedCourseOfferings}
                  options={timeAndSections}
                  onChange={this.timeAndSectionsHandleOnChange}
                  loading={sectionsDropdownLoading}
                  error={sectionsDropdownError}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Button onClick={this.handleAssignOnClick} color="green">
                  Assign
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Dimmer active={loading} inverted>
                <Loader content="Loading assigned courses ..." />
              </Dimmer>
              {!!courses.length && (
                <Grid.Column width={16}>
                  <Table className="remove-margin" textAlign="center">
                    <Table.Header textAlign="center">
                      <Table.Row>
                        <Table.HeaderCell width={3}>
                          Course Code
                        </Table.HeaderCell>
                        <Table.HeaderCell width={2}>Section</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Room</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Day</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Time</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Students</Table.HeaderCell>
                        <Table.HeaderCell width={2}>
                          <Label
                            as="a"
                            color="orange"
                            ribbon="right"
                            size="medium"
                          >
                            Total: {teaching_load} units
                          </Label>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                  </Table>
                  <div className="courses-table">
                    <Table textAlign="center">
                      <Table.Body>
                        {courses.map((course, index) => {
                          const {
                            course_offering_id,
                            no_of_students,
                            section,
                            course_name,
                            subject,
                            room,
                            day,
                            time_start,
                            time_end
                          } = course;
                          return (
                            <Course
                              key={index}
                              course_offering_id={course_offering_id}
                              no_of_students={no_of_students}
                              section={section}
                              course_name={course_name}
                              subject={subject}
                              room={room}
                              day={day}
                              alertMessage={this.alertMessage}
                              name={name}
                              time={`${convertToGeneralTime(
                                time_start
                              )}-${convertToGeneralTime(time_end)}`}
                            />
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="All Done" onClick={this.handleClose} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditLoadModal;
