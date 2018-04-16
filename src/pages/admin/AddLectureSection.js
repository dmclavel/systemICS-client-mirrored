import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Container, Dropdown } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

const inlineStyle={
	modal :{
		marginTop: '0px !important',
		marginLeft: 'auto',
		marginRight: 'auto',
		color: 'black'
	}
};

class AddCourseLecture extends Component {

	constructor(){
		super()

		this.state = {
			open:false,
			M:false,T:false,W:false,Th:false,F:false,
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			courses : [],
			section_type: 1,
			emp_no: null,
			acad_year: '',
			semester: '',
			no_of_students: 0,
			course_id: '',
			course_name: '',
			time_start: '',
			time_end: '',
			room: '',
			day:'',
			section: '',
			unit:'',
			max_capacity: '',
			error:''
		}
		autobind(this);
	}

	dayFormat(){
		const {M,T,W,Th,F, day} = this.state;
		let days = '';
		if(M) {

			if(days == '') {
				days = "M";
				this.setState({day:"M"});
			}
		}
		if(T) {
			
			if(days === '') {
				days = "T";
				this.setState({day:"T"});
				
			}
			else days = days +"-T"
		}
		if(W) {
			
			if(days === '') {
				days = "W";
				this.setState({day:"W"});
				
			}
			else days = days +"-W"
		}
		if(Th) {
			
			if(days === '') {
				days = "Th";
				this.setState({day:"Th"});
				
			}
			else days = days +"-Th";
		}
		if(F) {
			
			if(days === '') {
				days = "F";
				this.setState({day:"F"});
				
			}
			else days = days +"-F"
		}

		console.log("Days " + days);
		return days;
	}

	handleChange = (e, {name, value}) => {

		this.setState({[name]: value })
		
	}

	handleDayChange = (e, {content,active}) => {

		if(active == true) this.setState({[content]: false});
		else if(active == false) this.setState({[content]: true });
	}

	
	handleSubmit = () => {
		let days = this.dayFormat();
		const{section_type, course_id, course_name, emp_no, acad_year, semester, no_of_students, time_start, time_end, room, day, section, unit, max_capacity} = this.state
		const socket = socketIOClient(this.state.address);
		const data = {

			email: 'pvgrubat@up.edu.ph',
			acad_year:acad_year, 
			semester:2,
			time_start:time_start, 
			time_end:time_end, 
			room:room, 
			no_of_students:no_of_students,
			day:days, 
			section:section, 
			section_type:section_type, 
			max_capacity:max_capacity, 
			emp_no:emp_no,
			course_id:course_id, 
			unit: unit
		};
		// console.log(data);
		this.setState({error:''});
		if(course_id == '' ||
		   section == '' || 
		   room == '' || 
		   time_start == '' || time_end == '' ||
		   max_capacity == ''){
			// console.log(data);
			this.setState({error:'Fill all fields!'});
		}
		else if(this.state.error == ''){
			console.log(data);
			socket.emit("create_section", data);
			this.close();
		}
	}

	close = () =>
		this.setState(
			{
			open:false,

			M:false,T:false,W:false,Th:false,F:false,
			course_id:'',
			time_start:'',
			time_end:'',
			room:'',
			day:'',
			section:'',
			unit:'',
			max_capacity:''}
		)


	open = () =>{
		this.setState({open:true})

		const socket = socketIOClient(this.state.address);
		const data = {email: 'pvgrubat@up.edu.ph'};

		socket.emit("view_existing_courses", data);
		socket.on("view_existing_courses", (course) => {

			const tempArray = [];
			course.forEach((c) => {
				tempArray.push({
				key: c.course_id,
				value: c.course_id,
				text: c.course_name
				})
			});
			this.setState({courses:tempArray});
		});

	}

	 handleDropdownChange(e,data){

	 	const state = this.state;
	 	state.course_id = data.value;
	 	this.setState(state);
	 	console.log(this.state.course_id);

	 }

  render() {
		const{ open, error,  M,T,W,Th,F, course_name, courses, emp_no, acad_year, semester, no_of_students, time_start, time_end, room, day, section, unit, max_capacity} = this.state

    return(

       <Modal size='large' style={inlineStyle.modal} onOpen={this.open} open={open} onClose={this.close} trigger={<Button floated="right" positive content="Add Lecture Section" />} basic>
           <Modal.Content>
            	<Container>
            	<Segment padded="very">
            	<Grid>
            		<Grid.Row>
            			<Header as="h2">Add New Lecture </Header>
            		</Grid.Row>

            		<Grid.Row>
						<Form >

							<Form.Group>
		            			<Dropdown search selection label="Course name" placeholder="Pick course name" options={courses} onChange={this.handleDropdownChange}/>
		            			<Form.Input label="Section" placeholder="Section" name="section" value={section} onChange={this.handleChange}/>
		            			<Form.Input label="Room" placeholder="Room" name="room" value={room} onChange={this.handleChange}/>
								<Form.Input type="time" label="Time start" placeholder="Time start" name="time_start" value={time_start} onChange={this.handleChange}/>
								<Form.Input type="time" label="Time end" Input placeholder="Time end" name="time_end" value={time_end} onChange={this.handleChange}/>
							</Form.Group>

							<Form.Group>
								<Form.Input min={0} type="number" label="Maximum Capacity" placeholder="Max Capacity" name="max_capacity" value={max_capacity} onChange={this.handleChange}/>
		            			<Form.Input width={3} min={0} max={5} type="number" label="Units" name="unit" placeholder="Units"  value={unit} onChange={this.handleChange}/>
		            			<Form.Input width={3} min={2000} max={2500} type="number" label="Year" name="acad_year" placeholder="Year"  value={acad_year} onChange={this.handleChange}/>
		            			<Form.Field label="Days"> </Form.Field>

		            			<Form.Field>
		            			 <Button toggle circular size="medium" content='M' active={M} onClick={this.handleDayChange} />
		            			 <Button toggle circular size="medium" content='T' active={T} onClick={this.handleDayChange} />
		            			 <Button toggle circular size="medium" content='W' active={W} onClick={this.handleDayChange} />
		            		  	 <Button toggle circular size="medium" content='Th' active={Th} onClick={this.handleDayChange} />
		            		   	 <Button toggle circular size="medium" content='F'  active={F} onClick={this.handleDayChange} />
		            			</Form.Field>
							</Form.Group>

						</Form>
					 </Grid.Row>

					<Grid.Row>
						<Form>
							<Button content="Submit" floated="right" positive onClick={this.handleSubmit} / >
							<Container text> {error} </Container>
						</Form>
					</Grid.Row>

            	</Grid>
            	</Segment>
            	</Container>
            </Modal.Content>
       </Modal>
    );
  }
}

export default AddCourseLecture;
