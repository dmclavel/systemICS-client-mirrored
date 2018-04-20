import React, { Component } from 'react';
import {Grid, Menu} from 'semantic-ui-react';
import SearchCard from '../../../components/SearchCard';
import StudentTable from './StudentTable';
import FacultyTable from './FacultyTable';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

class User extends Component {
	constructor(props){
		super(props);
		this.state={
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			activeItem: 'Student',
      dummyStudents: [],
      dummyFaculty: [],
      origStudent: [],
      origFaculty: [],
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
      this.setState({ dummyStudents: returnValueFromServer });
      this.setState({origStudent: this.state.dummyStudents});
    });
    socket.emit('view_faculty', 'crgotis@up.edu.ph'); //send data to 'login' endpoint in server
    socket.on('view_faculty', returnValueFromServer => {
      console.log(returnValueFromServer);
      this.setState({ dummyFaculty: returnValueFromServer });
      this.setState({origFaculty: this.state.dummyFaculty});
    });
  };

	handleSearch = (query) => {
		if(query.length != 0){
			if (this.state.activeItem == 'Student'){
        //filter the dummyStudent
        this.setState(
        {
          dummyStudents: this.state.dummyStudents.filter( (user) =>{
            if(user.email_add.toLowerCase().includes(query.toLowerCase()) ||  user.name.toLowerCase().includes(query.toLowerCase()) || user.student_number.toLowerCase().includes(query.toLowerCase())){
              return true;
            }else{
              return false;
            }
          }
          )
        }
      );
      }else{
        //filter the dummyFaculty
        this.setState(
        {
          dummyFaculty: this.state.dummyFaculty.filter( (user) =>{
            if(user.email_add.toLowerCase().includes(query.toLowerCase()) || user.name.toLowerCase().includes(query.toLowerCase()) || user.emp_no.toLowerCase().includes(query.toLowerCase())){
              return true;
            }else{
              return false;
            }
          }
          )
        }
      );
      }
		}else{
      if (this.state.activeItem == 'Student'){
        this.setState({dummyStudents: this.state.origStudent});
      }else{
        this.setState({dummyFaculty: this.state.origFaculty});
      }
    }

	}

	handleItemClick = (e, {name}) => {
		this.setState({ activeItem: name });


	}

	handleData = (e) => {
		if (this.state.activeItem == 'Student'){
			return this.state.dummyStudents;
		}else{
			return this.state.dummyFaculty;
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
      				this.state.activeItem == 'Student'? <StudentTable data={this.state.dummyStudents}/>: <FacultyTable data={this.state.dummyFaculty}/>
      			}   			
			</Grid.Row>
			</Grid>
		);
	}
}


export default User;
