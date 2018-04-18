import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Dropdown, Container, Checkbox , Popup} from 'semantic-ui-react';
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
class EditCourse extends Component {
	constructor(props){
		super(props)

		this.state = {
			open: false,
			M:false,T:false,W:false,Th:false,F:false,
			statusOptions: [
							{key: 1, text:"Active", value:"Active"},
							{key: 2, text:"Dissolved", value:"Dissolved"},
							{key: 3, text:"Additional", value:"Additional"},
							{key: 4, text:"Petitioned", value: "Petitioned"}],
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			course_offering_id: this.props.courseoffering,
			emp_no: this.props.emp_no,
			acad_year: this.props.acadyear,
			semester: this.props.sem,
			no_of_students: this.props.noofstudents,
			course_id: this.props.course,
			course_name: this.props.coursecode,
			time_start:this.props.timestart,
			time_end: this.props.timeend,
			room: this.props.room,
			day:this.props.day,
			section: this.props.section,
			unit: this.props.unit,
			max_capacity: this.props.maxcapacity,
			status:this.props.status,
			section_type:this.props.section_type,
			course_title: this.props.title,
			description: this.props.desc
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
	handleDayChange = (e, {content,active}) => {

		if(active == true) this.setState({[content]: false});
		else if(active == false) this.setState({[content]: true });
	}


	handleChange = (e, {name, value}) => {
		this.setState({[name]: value})
	}

	handleDropdownChange(e,data){

	 	const state = this.state;
	 	state.status = data.value;
	 	this.setState(state);
	 	console.log(this.state.status);

	 }

	handleSubmit(){
		let days = this.dayFormat();
		const{ acad_year, semester, no_of_students, time_start, time_end, room, day, section, max_capacity, emp_no, status, section_type,course_offering_id} = this.state

		const socket = socketIOClient(this.state.address);
		const data = {
			email: 'pvgrubat@up.edu.ph',
			acad_year:acad_year, 
			semester:semester,
			time_start:time_start, 
			time_end:time_end, 
			room:room, 
			no_of_students:no_of_students,
			day:days, 
			section:section, 
			section_type:section_type, 
			max_capacity:max_capacity, 
			emp_no:emp_no,
			status: status,
			course_offering_id:course_offering_id
		};
		console.log(data);

		socket.emit("modify_section", data);

		this.props.fetchCourse();

		this.close()
	}

	open = () =>{
		this.setState({
			open:true
		})
	}

	close = () =>
		this.setState({
			open:false,
			M:false,T:false,W:false,Th:false,F:false,
	});



  render() {
  	const{open, M,T,W,Th,F, statusOptions, emp_no, acad_year, semester, no_of_students, time_start, time_end, room, day, section, max_capacity, course_title, status} = this.state
    return(

       <Modal size='large' style={inlineStyle.modal} open={open} onOpen={this.open} onClose={this.close} trigger={ <Button icon="pencil" color="teal" /> } basic>
           <Modal.Content>
            	<Container>
            	<Segment padded="very">
            	<Grid>
            		<Grid.Row>
            		<Header as="h2">Edit {this.props.coursecode} {this.props.section} </Header>
            		</Grid.Row>
							<Grid.Row>
									<Form >
										
										<Form.Group>
		            						<Form.Input label="Course section" placeholder="Course section" name="section" value={section} onChange={this.handleChange}/>
		            						<Form.Input label="Room" placeholder="Room" name="room" value={room} onChange={this.handleChange}/>
		            						<Form.Input type="time" label="Time start" placeholder="Time start" name="time_start" value={time_start} onChange={this.handleChange}/>
											<Form.Input type="time" label="Time end" Input placeholder="Time end" name="time_end" value={time_end} onChange={this.handleChange}/>
										</Form.Group>
										
										<Form.Group>

											<Form.Field label="Status"></Form.Field>
		            						<Dropdown selection label="Status" placeholder={status} options={statusOptions} onChange={this.handleDropdownChange}/>
											
											<Form.Input width={2} min={0} type="number" label="Capacity" placeholder="Max Capacity" name="max_capacity" value={max_capacity} onChange={this.handleChange}/>
											<Form.Input width={2} min={0} type="number" label="No. of Students" placeholder="No. of Students" name="no_of_students" value={no_of_students} onChange={this.handleChange}/>

						            			<Form.Field label="Days"> </Form.Field>

						            			<Form.Field>
						            			 <Button toggle circular size="medium" content='M' active={M} onClick={this.handleDayChange}/>
						            			 <Button toggle circular size="medium" content='T' active={T} onClick={this.handleDayChange}/>
						            			 <Button toggle  circular size="medium" content='W' active={W} onClick={this.handleDayChange}/>
							            		 <Button toggle circular size="medium" content='Th' active={Th} onClick={this.handleDayChange}/>
							            		 <Button toggle circular size="medium" content='F' active={F} onClick={this.handleDayChange}/>
						            			</Form.Field>
										</Form.Group>

									</Form>
					      </Grid.Row>

								<Grid.Row>
									<Form>
										<Button content="Edit" floated="right" positive onClick={this.handleSubmit}/ >
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

export default EditCourse;
