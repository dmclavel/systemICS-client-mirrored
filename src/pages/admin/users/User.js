import React, { Component } from 'react';
import {Grid, Menu} from 'semantic-ui-react';
import SearchCard from '../../../components/SearchCard';
import StudentTable from './StudentTable';
import FacultyTable from './FacultyTable';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

const dummyStudents = [
  { name: 'John', student_number: '2015-10323', email_add: 'jhon@up.edu.ph', status: 'student', curriculum: '1-A'},
  { name: 'Leslie', student_number: '2015-10353', email_add: 'leslie@up.edu.ph', status: 'student', curriculum: '2-C'},
]

const dummyFaculty = [
  { name: 'Amber', empno: '12317890', email_add: 'amber@up.edu.ph', status: 'RegComm'},
  { name: 'Ben', empno: '987456123', email_add: 'ben@up.edu.ph', status: 'Faculty'},
]
class User extends Component {
	constructor(props){
		super(props);
		this.state={
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			studentData: [],
			facultyData: [],
			visibleData: [],
			activeItem: 'Student',
		}
		autobind(this);
	}
	// what to do once the page (re)loads
  componentDidMount = () => {
    const socket = socketIOClient(this.state.address); //establish connection to the server
    // listens on an endpoint and executes fallback function
    socket.emit('view_students', 'crgotis@up.edu.ph'); //send data to 'login' endpoint in server
    socket.on('view_students', returnValueFromServer => {
      console.log(returnValueFromServer);
      this.setState({ studentData: returnValueFromServer });
    });
    socket.emit('view_faculty', 'crgotis@up.edu.ph'); //send data to 'login' endpoint in server
    socket.on('view_faculty', returnValueFromServer => {
      console.log(returnValueFromServer);
      this.setState({ facultyData: returnValueFromServer });
    });
  };

	handleSearch = (query) => {
		if(query.length == 0){
			this.setState({visibleData: this.state.data})
		}else{
			this.setState(
				{
					visibleData: this.state.data.filter( (user) =>{
						if( user.name.toLowerCase().includes(query.toLowerCase()) || user.id.toLowerCase().includes(query.toLowerCase())){
							return true;
						}else{
							return false;
						}
					}
					)
				}
			);
		}
		console.log(this.state.visibleData);
	}

	handleItemClick = (e, {name}) => {
		this.setState({ activeItem: name });


	}

	handleData = (e) => {
		if (this.state.activeItem == 'Student'){
			return dummyStudents;
		}else{
			return dummyFaculty;
		}
	}


	render() {	
		return (
			<Grid>
			<Grid.Row>
				<SearchCard fluid={true} handleSearch={this.handleSearch} placeholder="name, email, or id number"/>
			</Grid.Row>
			<Grid.Row>
				<Menu fluid widths={2}>
			        <Menu.Item
			          name='Student'
			          active={this.state.activeItem === 'Student'}
			          onClick={this.handleItemClick}
			        >
			          Student
			        </Menu.Item>

			        <Menu.Item
			          name='reviews'
			          active={this.state.activeItem === 'faculty'}
			          onClick={this.handleItemClick}
			        >
			          Faculty
			        </Menu.Item>

	      		</Menu>
      		</Grid.Row>
      		<Grid.Row>
      			{
      				this.state.activeItem == 'Student'? <StudentTable data={dummyStudents}/>: <FacultyTable data={this.state.facultyData}/>
      			}
				
      			
			</Grid.Row>
			</Grid>
		);
	}
}


export default User;
