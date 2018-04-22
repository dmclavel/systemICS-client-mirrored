import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Message } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';
import {
  isScheduleConflict,
  convertToGeneralTime
} from '../../utils/TimeUtilities';
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
			hidden:true,
			open: false,
			negative: false,
			positive: false,
			existing: false,
			M: false,
			T: false,
			W: false,
			Th: false,
			F: false,
			address: 'https://sleepy-falls-95372.herokuapp.com/',
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
			message: ''
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
    this.setState({ existingCourses: nextProps.data });
  }

	clear = () => {
			this.setState({
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
				time_start: '7:00',
				time_end: '19:00',
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
			time_start: '7:00',
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
		const data = { email: 'pvgrubat@up.edu.ph' };

		socket.emit('view_existing_courses', data);
		socket.on('view_existing_courses', course => {
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
      semester
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
      unit
    };
    let conflict = false;
    let details = '';
    for (let i = 0; i < this.state.existingCourses.length; i++) {
      if (
        // Replace the tabs and spaces and uppercase the room provided to compare them
        this.state.existingCourses[i].room.replace(/\s/g, '').toUpperCase() ===
        this.state.room.replace(/\s/g, '').toUpperCase()
      ) {
        // If room is conflict, we will check if their time is also conflict.
        const argc = {
          time_start,
          time_end,
          day: this.dayFormat()
        };
        if (isScheduleConflict(this.state.existingCourses[i], argc)) {
          conflict = true;
          const {
            course_name: _name,
            section: _section,
            day: _day,
            time_start: t_start,
            time_end: t_end,
            room: _room
          } = this.state.existingCourses[i];
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
    } else {
      this.setState({
        message: 'Successfully added a new lecture section!',
        positive: true,
        negative: false,
        hidden: false
      });
      socket.emit('create_section_2', data);
      this.props.fetchCourse();
			this.clear();
    }
  };

	handleChange = (e, { name, value }) => {
			if (name === "section" && this.state.course_name != "") {
				this.fillExistingSections();
				this.setState({ hidden: true});
				this.state.existingSections.forEach (element => {
					if (value === element.section && parseInt(this.state.course_id) == parseInt(element.course_id)){
						this.setState({hidden: false, existing: true});
						let appendString = "Section " + element.section + " of "+  element.course_name + " already exists!";
						this.setState({message: appendString, positive: false, negative: true});
					}
				});

				if (!this.state.existing) {
					this.setState({ [name]: value });
				}else{
					this.setState({ existing: false});
				}
			}
			else {
				if (this.state.course_name === "") {
					this.setState({ hidden: false});
					this.setState({message: "Please choose a Course Name first!", positive: false, negative: true});
				}
				else {
					this.setState({ hidden: true});
					this.setState({ [name]: value });
				}
			}
		};

		fillExistingSections() {
			const socket = socketIOClient(this.state.address);
			const data = { email: 'pvgrubat@up.edu.ph', acad_year: 2015, semester: 1 };
			socket.emit('view_sections', data);
			socket.on('view_sections', course => {
				this.setState({ existingSections: course });
			});
		}

	handleDropdownChange(e, data) {
		this.clear();
		const state = this.state;
		state.course_id = data.value;
		state.course_name = data.text;
		this.setState({course_id:state.course_id, course_name:state.course_name});
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
    } = this.state;

		return (
			<Modal
				size="large"
				style={inlineStyle.modal}
				onOpen={this.open}
				open={open}
				onClose={this.close}
				trigger={
					<Button floated="right" positive content="Add Lecture Section" fluid/>
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
										width={10}
										label="Course name"
										name="course_name"
										placeholder="Pick course name"
										options={courses}
										onChange={this.handleDropdownChange}
									/>
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
