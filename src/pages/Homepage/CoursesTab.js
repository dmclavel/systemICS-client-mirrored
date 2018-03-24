import React, { Component } from 'react';
import { Segment, Container, Grid, Image, Button, Header } from 'semantic-ui-react';
import './Heading.css';
import CourseCard from './CourseCard';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';

const square = { width: 100, height: 100 };
const square1 = { width: 50, height: 50 };

class CourseTab extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	        endpoint:  'http://10.0.5.153:3000', // the address of the server
	        courses: [
	        {"course_title": "Introduction to Internet", "course_number": "CMSC 2", "course_description": "Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.", "course_instructor_room": "C112", "course_instructor": "Reginald Recario", "course_room": "tentative", "course_schedule": "2:00-4:00"},
	        {"course_title": "Introduction to Internet", "course_number": "CMSC 21", "course_description": "Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.", "course_instructor_room": "C112", "course_instructor": "Reginald Recario", "course_room": "ICSLH", "course_schedule": "Tentative"},
	        {"course_title": "Introduction to Internet", "course_number": "CMSC 128", "course_description": "Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.", "course_instructor_room": "C112", "course_instructor": "Reginald Recario", "course_room": "ICSMH", "course_schedule": "1:00-4:00"}
	        ]

	    }
	    autobind(this);
 	}

  // what to do once the page (re)loads
	componentDidMount = () =>{
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    // listens on an endpoint and executes fallback function
		    socket.emit('view_all_faculty', 'this is my data');//send data to 'login' endpoint in server
		    socket.on('view_all_faculty', (returnValueFromServer) => {
		      console.log(returnValueFromServer);
		    });
		  }
		  //a function for sending data to server.you can have many of these
		  sendData = () => {
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    socket.emit('login', 'this is my data');//send data to 'login' endpoint in server
	}
	render() {
		return (
			<div>
			<div className="heading-main">
				</div>
			<div className="courses">

				<br />
				{this.state.courses.map((item, index)=>
				<CourseCard course_instructor={item.course_instructor} course_number={item.course_number} course_instructor={item.course_instructor} course_title={item.course_title} course_schedule={item.course_schedule} course_instructor_room={item.course_instructor_room} course_room={item.course_room}/>
				
			)}
			</div>
			</div>
		);
	}
}

export default CourseTab;
