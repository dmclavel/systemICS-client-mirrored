import React, { Component } from 'react';
import {
  Button,
  Modal,
  Form,
  Segment,
  Header,
  Message,
  Divider
} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import config from './../../config.json';
import {
  isScheduleConflict,
  convertToGeneralTime
} from '../../utils/TimeUtilities';
const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black'
  }
};
class EditCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      negative: false,
      positive: false,
      hidden: true,
      open: false,
      M: this.props.day.includes('M'),
      T: this.props.day.includes('T'),
      W: this.props.day.includes('W'),
      Th: this.props.day.includes('Th'),
      F: this.props.day.includes('F'),
      statusOptions: [
        { key: 1, text: 'Active', value: 'Active' },
        { key: 2, text: 'Dissolved', value: 'Dissolved' },
        { key: 3, text: 'Additional', value: 'Additional' },
        { key: 4, text: 'Petitioned', value: 'Petitioned' }
      ],
      address: config.backendAddress,
      course_offering_id: this.props.courseoffering,
      emp_no: this.props.emp_no,
      acad_year: this.props.acadyear,
      semester: this.props.sem,
      no_of_students: this.props.noofstudents,
      course_id: this.props.course,
      course_name: this.props.coursecode,
      time_start: this.props.timestart,
      time_end: this.props.timeend,
      room: this.props.room,
      day: this.props.day,
      section: this.props.section,
      unit: this.props.unit,
      max_capacity: this.props.maxcapacity,
      status: this.props.status,
      section_type: this.props.section_type,
      course_title: this.props.title,
      description: this.props.desc,
      existingSections: []
    };
    autobind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ existingSections: nextProps.data });
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

  handleDayChange = (e, { content, active }) => {
    if (active) this.setState({ [content]: false });
    else this.setState({ [content]: true });
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleDropdownChange(e, data) {
    const state = this.state;
    state.status = data.value;
    this.setState(state);
  }

  handleSubmit() {
    let days = this.dayFormat();
    const {
      acad_year,
      semester,
      no_of_students,
      time_start,
      time_end,
      room,
      section,
      max_capacity,
      emp_no,
      status,
      section_type,
      course_offering_id
    } = this.state;

    const socket = socketIOClient(this.state.address);
    const data = {
      email: 'pvgrubat@up.edu.ph',
      acad_year: acad_year,
      semester: semester,
      time_start: time_start,
      time_end: time_end,
      room: room,
      no_of_students: no_of_students,
      day: days,
      section: section,
      section_type: section_type,
      max_capacity: Number(max_capacity),
      emp_no: emp_no,
      status: status,
      course_offering_id: course_offering_id
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
        if (
          this.state.course_offering_id !==
            this.state.existingSections[i].course_offering_id &&
          isScheduleConflict(this.state.existingSections[i], argc)
        ) {
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
    if (conflict) {
      this.setState({
        message: details,
        hidden: false,
        positive: false,
        negative: true
      });
    } else if (
      parseInt(this.state.no_of_students, 10) <=
      parseInt(this.state.max_capacity, 10)
    ) {
      socket.emit('modify_section_2', data);
      this.setState({
        message: 'Successfully edited section information!',
        hidden: false,
        positive: true,
        negative: false
      });
    } else if (
      parseInt(this.state.no_of_students, 10) >
      parseInt(this.state.max_capacity, 10)
    ) {
      this.setState({
        message: 'Number of students allowed is beyond the maximum capacity!',
        hidden: false,
        positive: false,
        negative: true
      });
    }
  }

  open = () => {
    this.setState({
      open: true
    });
  };

  close = () =>
    this.setState({
      open: false,
      message: '',
      negative: false,
      positive: false,
      hidden: true
    });

  render() {
    const {
      open,
      message,
      positive,
      negative,
      hidden,
      M,
      T,
      W,
      Th,
      F,
      statusOptions,
      no_of_students,
      time_start,
      time_end,
      room,
      section,
      max_capacity,
      status
    } = this.state;
    return (
      <Modal
        size="large"
        style={inlineStyle.modal}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        trigger={
          <Button icon="pencil" floated="right" size="mini" color="teal" />
        }
        basic
      >
        <Modal.Content>
          <Segment padded="very">
            <Header as="h2">
              Edit {this.props.coursecode} {this.props.section}{' '}
            </Header>
            <Divider />
            <Form>
              <Form.Group>
                <Form.Input
                  label="Course section"
                  placeholder="Course section"
                  name="section"
                  disabled
                  value={section}
                  onChange={this.handleChange}
                  width={4}
                />
                <Form.Input
                  label="Room"
                  placeholder="Room"
                  name="room"
                  value={room}
                  onChange={this.handleChange}
                  width={4}
                />
                <Form.Input
                  type="time"
                  label="Time start"
                  placeholder="Time start"
                  name="time_start"
                  value={time_start}
                  onChange={this.handleChange}
                  width={4}
                />
                <Form.Input
                  type="time"
                  label="Time end"
                  placeholder="Time end"
                  name="time_end"
                  value={time_end}
                  onChange={this.handleChange}
                  width={4}
                />
              </Form.Group>

              <Form.Group>
                <Form.Dropdown
                  search
                  selection
                  label="Status"
                  placeholder="Choose status"
                  options={statusOptions}
                  value={status}
                  onChange={this.handleDropdownChange}
                  width={4}
                />
                <Form.Input
                  min={0}
                  type="number"
                  label="Capacity"
                  placeholder="Max Capacity"
                  name="max_capacity"
                  value={max_capacity}
                  onChange={this.handleChange}
                  width={4}
                />
                <Form.Input
                  min={0}
                  max={max_capacity}
                  type="number"
                  label="No. of Students"
                  placeholder="No. of Students"
                  name="no_of_students"
                  value={no_of_students}
                  onChange={this.handleChange}
                  width={3}
                />
                <div className="form-days">
                  <Form.Field label="Days"> </Form.Field>
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
            </Form>
            <Message negative={negative} positive={positive} hidden={hidden}>
              <Message.Header>{message}</Message.Header>
            </Message>
            <Divider />
            <Form>
              <Button
                content="Edit"
                floated="right"
                positive
                onClick={this.handleSubmit}
              />
            </Form>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditCourse;
