import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Message, Radio } from 'semantic-ui-react';
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
    marginTop: '23vh',
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

class AddCourseLecture extends Component {
  constructor() {
    super();

    this.state = {
      hidden: true,
      open: false,
      negative: false,
      positive: false,
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      address: config.backendAddress,
      courses: [],
      existingSections: [],
      section_type: 0,
      emp_no: null,
      acad_year: '',
      semester: '',
      no_of_students: 0,
      course_id: '',
      course_name: '',
      time_start: '07:00',
      time_end: '19:00',
      room: '',
      day: '',
      section: '',
      unit: '',
      max_capacity: '',
      message: '',
      status: '',
      existing: false
    };
    autobind(this);
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

  componentWillReceiveProps(nextProps) {
    this.setState({ existingSections: nextProps.data });
  }

  clear() {
    this.setState({
      existingSections: [],
      existing: false,
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      course_id: '',
      course_name: '',
      time_start: '',
      time_end: '',
      room: '',
      day: '',
      section: '',
      unit: '',
      max_capacity: ''
    });
  }

  close = () =>
    this.setState({
      open: false,
      existingSections: [],
      hidden: true,
      negative: false,
      positive: false,
      existing: false,
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      course_id: '',
      course_name: '',
      time_start: '07:00',
      time_end: '19:00',
      room: '',
      day: '',
      section: '',
      unit: '',
      max_capacity: ''
    });

  open = () => {
    this.setState({ open: true });

    const socket = socketIOClient(this.state.address);

    socket.emit('view_courses', { ignoreExistingSections: true });
    socket.on('view_courses', course => {
      const tempArray = [];
      course.forEach(c => {
        tempArray.push({
          key: c.course_id,
          value: c.course_id,
          text: c.course_name
        });
      });
      this.setState({ courses: tempArray });
    });
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
      course_id === '' ||
      section === '' ||
      room === '' ||
      time_start === '' ||
      time_end === '' ||
      max_capacity === '' ||
      days === '' ||
      status === ''
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
      this.clear();
    }
  };
  handleChange = (e, { name, value }) => {
    let existing = false;
    let details = '';
    let message = '';
    if (name === 'section' && this.state.course_name !== '') {
      // this.fillExistingSections();
      this.state.existingSections.forEach(element => {
        if (
          value === element.section &&
          parseInt(this.state.course_id) === parseInt(element.course_id)
        ) {
          message = 'Duplicate entry for section!';
          details +=
            'Section ' +
            element.section +
            ' of ' +
            element.course_name +
            ' already exists!';
          existing = true;
          this.setState({
            message,
            details,
            positive: false,
            negative: true,
            hidden: false
          });
        }
      });
      //TODO
    }
    if (existing) {
      this.setState({ message, details, [name]: value, existing });
    } else {
      this.setState({ [name]: value, hidden: true, existing });
    }
    // }
  };

  // fillExistingSections() {
  //   const socket = socketIOClient(this.state.address);
  //   const data = { email: 'pvgrubat@up.edu.ph', acad_year: 2015, semester: 1 };
  //   socket.emit('view_sections', data);
  //   socket.on('view_sections', course => {
  //     this.setState({ existingSections: course });
  //   });
  // }

  handleDropdownChange(e, data) {
    let message = '';
    let details = '';
    let hidden = true;
    const state = this.state;
    state.course_id = data.value;
    state.course_name = data.text;
    this.state.existingSections.forEach(element => {
      if (
        this.state.section === element.section &&
        this.state.course_id === element.course_id
      ) {
        message = 'Duplicate entry for section!';
        details +=
          'Section ' +
          element.section +
          ' of ' +
          element.course_name +
          ' already exists!';
        hidden = false;
      }
    });
    this.setState({
      message,
      details,
      positive: false,
      negative: true,
      course_id: state.course_id,
      course_name: state.course_name,
      hidden
    });
  }

  handleSemester(e, data) {
    const state = this.state;
    state.semester = data.value;
    this.setState(state);
  }

  render() {
    const {
      open,
      negative,
      positive,
      message,
      details,
      hidden,
      M,
      T,
      W,
      Th,
      F,
      courses,
      acad_year,
      time_start,
      time_end,
      room,
      section,
      unit,
      max_capacity
      // ,status
    } = this.state;

    return (
      <Modal
        size="large"
        style={inlineStyle.modal}
        onOpen={this.open}
        open={open}
        onClose={this.close}
        trigger={
          <Button floated="right" positive content="Add Lecture Section" />
        }
      >
        <Modal.Header>Add New Lecture</Modal.Header>
        <Modal.Content>
          <Grid>
            <Form className="form-lecture">
              <Grid.Row>
                <Form.Group>
                  <Form.Dropdown
                    search
                    selection
                    width={5}
                    label="Course name"
                    name="course_name"
                    placeholder="Pick course name"
                    options={courses}
                    onChange={this.handleDropdownChange}
                  />
                  <Form.Group grouped width={3}>
                    <label>Status</label>
                    <Form.Field>
                      <Radio
                        label="Active"
                        name="status"
                        value="Active"
                        checked={this.state.status === 'Active'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label="Petitioned"
                        name="status"
                        value="Petitioned"
                        checked={this.state.status === 'Petitioned'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Input
                    label="Section"
                    placeholder="Section"
                    name="section"
                    value={section}
                    width={3}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Room"
                    placeholder="Room"
                    name="room"
                    width={3}
                    value={room}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Grid.Row>

              <Grid.Row>
                <Form.Group>
                  <Form.Input
                    type="time"
                    label="Time start"
                    placeholder="Time start"
                    name="time_start"
                    width={4}
                    value={time_start}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    type="time"
                    label="Time end"
                    placeholder="Time end"
                    name="time_end"
                    width={4}
                    value={time_end}
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
              </Grid.Row>

              <Grid.Row>
                <Form.Group />

                <Form.Group>
                  <Form.Input
                    min={0}
                    type="number"
                    label="Maximum Capacity"
                    placeholder="Max Capacity"
                    name="max_capacity"
                    value={max_capacity}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    width={3}
                    min={0}
                    max={5}
                    type="number"
                    label="Units"
                    name="unit"
                    placeholder="Units"
                    value={unit}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    width={3}
                    min={2000}
                    max={2500}
                    type="number"
                    label="Academic Year"
                    name="acad_year"
                    placeholder="Year"
                    value={acad_year}
                    onChange={this.handleChange}
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
                </Form.Group>
              </Grid.Row>
              <Grid.Row>
                <Message
                  negative={negative}
                  positive={positive}
                  hidden={hidden}
                >
                  <Message.Header>{message}</Message.Header>
                  {details && (
                    <ul>
                      <li>{details}</li>
                    </ul>
                  )}
                </Message>
              </Grid.Row>
            </Form>{' '}
          </Grid>
        </Modal.Content>
        <Modal.Actions className="modal-actions">
          <Button
            content="Submit"
            floated="right"
            positive
            onClick={this.handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddCourseLecture;
