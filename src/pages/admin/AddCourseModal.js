import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Segment, Header, Divider, Container, Checkbox, Input } from 'semantic-ui-react';
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
class AddCourseModal extends Component {

	constructor(){
		super()

		this.state = {
			open: false,
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			coursesX : [],
			courses : [],
			course_name: '',
			course_title: '',
			description: '',
			error:''

		}
		autobind(this);
	}

	handleChange = (e, {name, value} ) => {
		// const{course_name, course_title, description, coursename_error, coursetitle_error, desc_error} = this.state
		this.setState({[name]: value})
	}

	handleSubmit = (evt) => {
		const{course_name, course_title, description, coursename_error, coursetitle_error, desc_error, course} = this.state

		// this.setState(
		// 	{
		// 	course_title:course_title,
		// 	course_name:course_name,
		// 	description:description,
		// }

		// this.setState({[name]: value})
		if(this.state.course_name == '' || this.state.course_title=='' || this.state.description=='') {
			this.setState({error:'Please fill all the fields!'})
		}else{
		this.setState({error:''})

		console.log(data);
		const socket = socketIOClient(this.state.address);
		const data = {email: 'pvgrubat@up.edu.ph', course_name:course_name, course_title:course_title, description:description};
		socket.emit("insert_course", data);
		this.props.fetchCourse();
		this.close()
		}
	}

	open = () =>{
		this.setState({
			open:true
		})
	}

	close = () =>
		this.setState({
			open:false,
			course_title:'',
			course_name: '',
			description:''
	});

  render() {
		const{course_name, open, course_title, description, error} = this.state

    return(

       <Modal size='large' style={inlineStyle.modal} onClose={this.close} onOpen={this.open} open={open} trigger={<Button floated="right" positive content="Add course" />} basic >
           <Modal.Content>
            	<Container>
            	<Segment padded="very">
            	<Grid>
					<Grid.Row>
						<Header as="h2">Add Course </Header>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16}>
							<Form>
							<Form.Group>

								<Form.Input width={3} label="Course Name" placeholder="Course Name" name="course_name" value={course_name} onChange={this.handleChange} required/>
								<Form.Input width={3} label="Course Title" placeholder="Course Title" name="course_title" value={course_title} onChange={this.handleChange} required/>
								<Form.Input width={10} label="Course Description" placeholder="Course Description" name="description" value={description} onChange={this.handleChange} required/>

							</Form.Group>
							</Form>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Container text> {error} </Container>
						<Button floated="right" onClick={this.handleSubmit} > Submit</Button>

					</Grid.Row>

            	</Grid>
            	</Segment>
            	</Container>
            	</Modal.Content>
       </Modal>
    );
  }
}

export default AddCourseModal;
