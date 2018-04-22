import React, { Component } from 'react';
import {Grid, Menu, Button, Loader} from 'semantic-ui-react';
import SearchCard from '../../../components/SearchCard';
import StudentTable from './StudentTable';
import FacultyTable from './FacultyTable';
import StudentAdd from './StudentAdd';
import AddFaculty from './AddFaculty';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: 'https://sleepy-falls-95372.herokuapp.com/',
			activeItem: 'Student',
		      dummyStudents: [],
		      dummyFaculty: [],
		      origStudent: [],
		      origFaculty: [],
		      loading: true
		}
		autobind(this);
	}
	// what to do once the page (re)loads
  componentDidMount = () => {
  	this.setState({ loading: true });
    const socket = socketIOClient(this.state.address); //establish connection to the server
    // listens on an endpoint and executes fallback function
    socket.emit('view_students', 'crgotis@up.edu.ph'); //send data to 'login' endpoint in server
    socket.on('view_students', returnValueFromServer => {
      console.log(returnValueFromServer);
      this.setState({ dummyStudents: returnValueFromServer });
      this.setState({origStudent: this.state.dummyStudents});
      this.setState({ loading: false });
    });
    socket.emit('view_faculty', 'crgotis@up.edu.ph'); //send data to 'login' endpoint in server
    socket.on('view_faculty', returnValueFromServer => {
      console.log(returnValueFromServer);
      this.setState({ dummyFaculty: returnValueFromServer });
      this.setState({origFaculty: this.state.dummyFaculty});
      this.setState({ loading: false });
    });
  };

	handleSearch = (query) => {
		if(query.length != 0){
  		  if (this.state.activeItem == 'Student'){
          this.setState({dummyStudents: this.state.dummyStudents.filter((student)=>{
              if (student.name.toLowerCase().includes(query.toLowerCase()) || student.email_add.toLowerCase().includes(query.toLowerCase()) ){
                return true;
              }else{
                return false;
              }
          })});
      }else{
        this.setState({dummyFaculty: this.state.dummyFaculty.filter((faculty)=>{
              if (faculty.name.toLowerCase().includes(query.toLowerCase()) || faculty.email_add.toLowerCase().includes(query.toLowerCase()) ){
                return true;
              }else{
                return false;
              }
          })});
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

	fetchStudents = () => {
		const socket = socketIOClient(this.state.address); //establish connection to the server
		// listens on an endpoint and executes fallback function
		socket.emit('view_students', 'crgotis@up.edu.ph'); //send data to 'login' endpoint in server
		socket.on('view_students', returnValueFromServer => {
			console.log(returnValueFromServer);
			this.setState({ dummyStudents: returnValueFromServer });
			this.setState({origStudent: this.state.dummyStudents});
		});
	}

	fetchFaculty = () => {
		const socket = socketIOClient(this.state.address); //establish connection to the server
		// listens on an endpoint and executes fallback function
		socket.emit('view_faculty', 'crgotis@up.edu.ph'); //send data to 'login' endpoint in server
    socket.on('view_faculty', returnValueFromServer => {
      console.log(returnValueFromServer);
      this.setState({ dummyFaculty: returnValueFromServer });
      this.setState({origFaculty: this.state.dummyFaculty});
    });
	}

	render() {
		return (
			<Grid>
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
			          name='Faculty'
			          active={this.state.activeItem === 'Faculty'}
			          onClick={this.handleItemClick}
			        >
			          Faculty
			        </Menu.Item>

	      		</Menu>
      		</Grid.Row>
			<Grid.Row fluid>
				<Grid.Column width={13}>
					<SearchCard fluid handleSearch={this.handleSearch} placeholder="name or email"/>
				</Grid.Column>
				<Grid.Column width={3}>
      			{ 
      				this.state.activeItem == 'Student'? <StudentAdd floated="right" fetchData={this.fetchStudents}/>: <AddFaculty fetchData={this.fetchFaculty}/>
      			}
      			</Grid.Column>
			</Grid.Row>
      		<Grid.Row>
      			{
      				this.state.activeItem == 'Student'? <StudentTable data={this.state.dummyStudents} fetchData={this.fetchStudents} />: <FacultyTable data={this.state.dummyFaculty} fetchData={this.fetchFaculty}/>
      			}
			</Grid.Row>
			<Grid.Row>
				<Loader active={this.state.loading} content="Loading..." />
			</Grid.Row>
			</Grid>
		);
	}
}


export default User;
