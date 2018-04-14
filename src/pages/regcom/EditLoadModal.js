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
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';
import Course from './Course';
import { isConflicting, convertToGeneralTime } from '../../utils/TimeUtilities';
import img from './kobe.jpg';

// Modal inlineStyle to fix centering
const inlineStyle = {
  modal: {
    marginTop: '10vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class EditLoadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_offerings: [],                       // not yet used
      codesAndDescription: [],                    // list of options for courses
      selectedCodeAndDescriptionId: undefined,    // value to retrieve from active courses dropdown
      selectedCourseOfferingIds: [],              // values to retrieve from multiple time and section dropdown
      timeAndSections: [],                        // list of options for time and sections available for course
      courses: [],                                // courses assigned to a faculty 
      open: false,                                // state of the modal
      endpoint: 'https://sleepy-falls-95372.herokuapp.com'  // endpoint 
    };
    autobind(this);
  }
  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    // For the client to be aware of the changes in the database
    socket.on('update_alert', update => {
      socket.emit('view_all_active_courses_with_unlinked_sections', {});
      socket.emit('search_course_offerings_of_specific_faculty', {
        emp_no: this.props.emp_no
      });
    });
    // Retrieve courses with unlinked sections
    socket.emit('view_all_active_courses_with_unlinked_sections', {});
    socket.on('view_all_active_courses_with_unlinked_sections', courses => {
      let codesAndDescription = [];
      // For each courses, concat course name with course id e.g. CMSC 22 - Intro to OOP
      courses.forEach((course, index) => {
        const { course_name, course_title, course_id } = course;
        codesAndDescription.push({
          key: course_id,
          text: `${course_name} - ${course_title}`,
          value: `${course_id}`
        });
      });
      this.setState({
        codesAndDescription
      });
    });
    // For a specific faculty show their assigned courses
    socket.emit('search_course_offerings_of_specific_faculty', {
      emp_no: this.props.emp_no
    });
    socket.on('search_course_offerings_of_specific_faculty', courses => {
      this.setState({
        courses
      });
    });

  }
  // Modal methods
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  // Assign course_offering_ids to a professor
  handleAssignOnClick(e) {
    const socket = socketIOClient(this.state.endpoint);
    // For each id values from multiple dropdown, send it to the database
    //      to assign the employee with the course_offering
    this.state.selectedCourseOfferingIds.forEach(course_offering_id => {
      socket.emit('link_course_offering', {
        emp_no: this.props.emp_no,
        course_offering_id
      });
    });
    // Clear the values of the dropdown and multiple dropdown
    this.setState({ selectedCourseOfferingIds: [], selectedCodeAndDescriptionId: undefined, timeAndSections: [] });
  }

  codesAndDescriptionHandleOnChange(e, data) {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('view_all_unlinked_course_offerings', {
      course_id: data.value
    });

    socket.on('view_all_unlinked_course_offerings', course_offerings => {
      let timeAndSections = [];
      course_offerings.forEach((course_offering, index) => {
        const { time_start, time_end, day, section } = course_offering;
        timeAndSections.push({
          key: index,
          text: `${section} - ${day} ${convertToGeneralTime(time_start)}-${convertToGeneralTime(time_end)}`,
          value: course_offering.course_offering_id
        });
      });
      this.setState({
        course_offerings,
        timeAndSections,
        selectedCodeAndDescriptionId: data.value
      });
    });
  }
  timeAndSectionsHandleOnChange(e, data) {
    const objTest = {
      day: 'M',
      time_start: '8:00:00',
      time_end: '11:00:00'
    }
    const objTest2 = {
      day: 'M',
      time_start: '12:00:00',
      time_end: '1:00:00'
    }
    console.log(isConflicting(objTest, objTest2));
    this.setState({ selectedCourseOfferingIds: data.value });
  }
  render() {
    const { open } = this.state;
    const { button, name, teachingLoad } = this.props;
    const { selectedCourseOfferingIds, selectedCodeAndDescriptionId, timeAndSections, codesAndDescription, courses } = this.state;
    return (
      <Modal
        open={open}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        size="small"
        style={inlineStyle.modal}
        trigger={button} closeIcon>
        <Modal.Header>
          <Grid centered={true}>
            <Grid.Row fluid="true">
              <Grid.Column width={3}>
                <Image floated="left" avatar src={img} />
              </Grid.Column>
              <Header textAlign="left">
                <Header.Content>{name}</Header.Content>
                <Header.Subheader>
                  <Header
                    textAlign="left"
                    size="tiny"
                    icon="users"
                    subheader={teachingLoad}
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
                  options={codesAndDescription}
                  onChange={this.codesAndDescriptionHandleOnChange}
                  value={selectedCodeAndDescriptionId}
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
                  value={selectedCourseOfferingIds}
                  selection
                  options={timeAndSections}
                  onChange={this.timeAndSectionsHandleOnChange}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Button onClick={this.handleAssignOnClick} color="green">Assign</Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                {!!courses.length && <Segment>
                  <div
                    style={{
                      padding: '20px',
                      overflow: 'auto',
                      maxHeight: 200
                    }}>
                    {courses.map((course, index) => {
                      const { course_offering_id, no_of_students, section, course_name, subject, room, day, time_start, time_end } = course;
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
                          time={`${convertToGeneralTime(time_start)}-${convertToGeneralTime(time_end)}`}
                        />
                      );
                    })}
                  </div>
                </Segment>
                }
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
