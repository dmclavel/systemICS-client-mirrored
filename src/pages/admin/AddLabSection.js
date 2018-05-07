import React, { Component } from 'react';
import {
  Button,
  Modal,
  Form,
  Segment,
  Divider,
  Header,
  Container,
  Message
} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import {
  isScheduleConflict,
  convertToGeneralTime,
  isTimeValid,
  validTimeStartToTimeEnd
} from '../../utils/TimeUtilities';
import config from './../../config.json';

const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black'
  }
};

const semesterOptions = [
  {
    key: 1,
    value: 1,
    text: '1st Semester'
  },
  {
    key: 2,
    value: 2,
    text: '2nd Semester'
  },
  {
    key: 3,
    value: 3,
    text: 'Midyear'
  }
];

class AddCourseLab extends Component {
  constructor() {
    super();

    this.state = {
      address: config.backendAddress,
      appendedSection: '',
      message: '',
      labSectionAppend: '',
      negative: false,
      positive: false,
      hidden: true,
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      coursesX: [],
      courses: [],
      course_offering_id: '',
      lecture_id: '',
      emp_no: '',
      acad_year: '',
      semester: '',
      no_of_students: '',
      course_id: '',
      course_name: '',
      time_start: '7:00',
      time_end: '19:00',
      room: '',
      day: '',
      section: '',
      unit: '',
      max_capacity: '',
      status: '',
      course_title: '',
      description: '',
      posted: '',
      existingSections: []
    };
    autobind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      existingSections: nextProps.data,
      section: nextProps.section
    });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  labSectionFormat() {
    const { labSectionAppend } = this.state;
    let tempStr = this.props.section;
    let labSection = tempStr + '-' + labSectionAppend;
    return labSection;
  }

  dayFormat() {
    const { M, T, W, Th, F } = this.state;
    let days = '';
    if (M) {
      if (days === '') {
        days = 'M';
        this.setState({ day: 'M' });
      }
    }
    if (T) {
      if (days === '') {
        days = 'T';
        this.setState({ day: 'T' });
      } else days = days + '-T';
    }
    if (W) {
      if (days === '') {
        days = 'W';
        this.setState({ day: 'W' });
      } else days = days + '-W';
    }
    if (Th) {
      if (days === '') {
        days = 'Th';
        this.setState({ day: 'Th' });
      } else days = days + '-Th';
    }
    if (F) {
      if (days === '') {
        days = 'F';
        this.setState({ day: 'F' });
      } else days = days + '-F';
    }
    return days;
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleDayChange = (e, { content, active }) => {
    if (active === true) this.setState({ [content]: false });
    else if (active === false) this.setState({ [content]: true });
  };

  handleSubmit = () => {
    let days = this.dayFormat();
    const {
      section_type,
      course_id,
      emp_no,
      acad_year,
      no_of_students,
      time_start,
      time_end,
      room,
      section,
      unit,
      max_capacity,
      semester,
      status
    } = this.state;
    const socket = socketIOClient(this.state.address);
    const data = {
      email: 'pvgrubat@up.edu.ph',
      acad_year,
      semester,
      time_start,
      time_end,
      room,
      no_of_students,
      day: days,
      section,
      section_type,
      max_capacity,
      emp_no,
      course_id,
      unit,
      status
    };
    let conflict = false;
    let details = '';
    for (let i = 0; i < this.state.existingSections.length; i++) {
      if (
        // Replace the tabs and spaces and uppercase the room provided to compare them
        this.state.existingSections[i].room.replace(/\s/g, '').toUpperCase() ===
        this.state.room.replace(/\s/g, '').toUpperCase()
      ) {
        // If room is conflict, we will check if their time is also conflict.
        const argc = {
          time_start,
          time_end,
          day: this.dayFormat()
        };
        if (isScheduleConflict(this.state.existingSections[i], argc)) {
          conflict = true;
          const {
            course_name: _name,
            section: _section,
            day: _day,
            time_start: t_start,
            time_end: t_end,
            room: _room
          } = this.state.existingSections[i];
          details += `Data is conflicting with ${_name} ${_section} - ${_day} ${convertToGeneralTime(
            t_start
          )}-${convertToGeneralTime(t_end)}, ${_room}`;
          break;
        }
      }
    }
    if (
      room === '' ||
      time_start === '' ||
      time_end === '' ||
      max_capacity === '' ||
      days === ''
    ) {
      this.setState({
        message: 'Please complete all the required fields!',
        positive: false,
        negative: true,
        hidden: false
      });
    } else if (conflict) {
      this.setState({
        message: 'Error! Conflict with room and time!',
        details,
        positive: false,
        negative: true,
        hidden: false
      });
    } else if (validTimeStartToTimeEnd(time_start, time_end)) {
      this.setState({
        message: 'Error! Invalid time start and end!',
        details,
        positive: false,
        negative: true,
        hidden: false
      });
    } else if (!isTimeValid(time_start)) {
      this.setState({
        message: 'Error! Invalid time start.',
        details,
        positive: false,
        negative: true,
        hidden: false
      });
    } else if (!isTimeValid(time_end)) {
      this.setState({
        message: 'Error! Invalid time end.',
        details,
        positive: false,
        negative: true,
        hidden: false
      });
    } else {
      this.setState(
        {
          message: 'Successfully added a new lecture section!',
          details,
          positive: true,
          negative: false,
          hidden: false
        },
        () => {
          console.log(data);
          socket.emit('create_section_2', data);
        }
      );
      this.props.fetchCourse();
    }
  };

  close = () =>
    this.setState({
      coursesX: [],
      courses: [],
      labSectionAppend: '',
      message: '',
      negative: false,
      positive: false,
      hidden: true,
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      course_offering_id: '',
      acad_year: '',
      semester: '',
      no_of_students: '',
      course_id: '',
      course_name: '',
      time_start: '7:00',
      time_end: '19:00',
      room: '',
      day: '',
      section: '',
      unit: '',
      max_capacity: '',
      status: '',
      course_title: '',
      description: ''
    });

  render() {
    const {
      labSectionAppend,
      message,
      positive,
      negative,
      hidden,
      M,
      T,
      W,
      Th,
      F,
      no_of_students,
      // courses,
      acad_year,
      // semester,
      time_start,
      time_end,
      room,
      // section,
      unit,
      max_capacity
    } = this.state;

    return (
      <Modal
        size="large"
        style={inlineStyle.modal}
        onClose={this.close}
        trigger={<Button icon="plus" positive />}
        basic
        closeIcon
      >
        <Modal.Content>
          <Segment padded="very">
            <Header as="h2">Add New Laboratory </Header>
            <Divider />
            <Form>
              <Form.Group>
                <Form.Input
                  label="Section"
                  placeholder={this.props.section}
                  disabled
                  width={2}
                />
                <br />
                <br />
                ―
                <Form.Input
                  label="Lab Section"
                  placeholder=""
                  name="labSectionAppend"
                  value={labSectionAppend}
                  onChange={this.handleChange}
                  width={4}
                />
                <Form.Input
                  label="Room"
                  placeholder="Room"
                  name="room"
                  value={room}
                  onChange={this.handleChange}
                  width={6}
                />
                <Form.Input
                  min={0}
                  type="number"
                  label="Maximum Capacity"
                  placeholder="Max Capacity"
                  name="max_capacity"
                  value={max_capacity}
                  onChange={this.handleChange}
                  width={4}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  width={3}
                  min={0}
                  max={max_capacity}
                  type="number"
                  label="Number of Students"
                  name="no_of_students"
                  placeholder="Number of Students"
                  value={no_of_students}
                  onChange={this.handleChange}
                />

                <Form.Input
                  type="time"
                  label="Time start"
                  placeholder="Time start"
                  name="time_start"
                  value={time_start}
                  onChange={this.handleChange}
                  width={5}
                />
                <Form.Input
                  type="time"
                  label="Time end"
                  Input
                  placeholder="Time end"
                  name="time_end"
                  value={time_end}
                  onChange={this.handleChange}
                  width={5}
                />

                <Form.Input
                  min={0}
                  max={5}
                  type="number"
                  label="Units"
                  name="unit"
                  placeholder="Units"
                  value={unit}
                  onChange={this.handleChange}
                  width={3}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  type="number"
                  label="Acad Year"
                  name="acad_year"
                  placeholder="Acad Year"
                  value={acad_year}
                  onChange={this.handleChange}
                  width={7}
                />
                <Form.Dropdown
                  width={4}
                  search
                  selection
                  label="Semester"
                  name="semester"
                  value={semesterOptions.value}
                  options={semesterOptions}
                  placeholder="Semester"
                  onChange={this.handleChange}
                />
                <div className="form-days">
                  <Form.Field label="Days" />
                  <Form.Field>
                    <Button
                      toggle
                      circular
                      size="medium"
                      content="M"
                      active={M}
                      onClick={this.handleDayChange}
                    />
                    <Button
                      toggle
                      circular
                      size="medium"
                      content="T"
                      active={T}
                      onClick={this.handleDayChange}
                    />
                    <Button
                      toggle
                      circular
                      size="medium"
                      content="W"
                      active={W}
                      onClick={this.handleDayChange}
                    />
                    <Button
                      toggle
                      circular
                      size="medium"
                      content="Th"
                      active={Th}
                      onClick={this.handleDayChange}
                    />
                    <Button
                      toggle
                      circular
                      size="medium"
                      content="F"
                      active={F}
                      onClick={this.handleDayChange}
                    />
                  </Form.Field>
                </div>
              </Form.Group>
              <Message negative={negative} positive={positive} hidden={hidden}>
                <Message.Header>{message}</Message.Header>
              </Message>

              <Divider />

              <Button
                content="Submit"
                floated="right"
                positive
                onClick={this.handleSubmit}
              />

              <Container text textAlign="left">
                {' '}
                {this.state.error}{' '}
              </Container>
            </Form>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddCourseLab;
