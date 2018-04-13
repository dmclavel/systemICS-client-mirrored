/*
AUTHOR: Gotis, Ciara Mae
FILE: FacultyTab, to be used for basic JS pages in the system.

BASIC TEMPLATE FOR ALL JS PAGES
DO NOT FORGET TO DOCUMENT YOUR OWN CODE.
Change name FacultyTab to the name of file.
This will be updated for mapping, grid layouting, etc.
Write the Author of the code at the top of the document.
*/
import {Image, Card, Button, Input, Grid, Container, Search, Header, Modal, Icon, Checkbox, Accordion, Segment, List} from "semantic-ui-react";
import React, { Component } from 'react';
import autobind from 'react-autobind';
import socketIOClient from 'socket.io-client';
import './FacultyTab.css';
import FacultyCard from './FacultyCard';
import RegComCard from './RegComCard';
import Navbar from '../components/Navbar';
import Heading from '../components/Heading';

/*
If you wish to import other JS files, do it here.
*/

class FacultyTab extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	        endpoint:  'https://sleepy-falls-95372.herokuapp.com/', // the address of the server
	        faculty: [
	        {"name": "",
           "email_add": "",
            "isRegCom": "" 
          }
	        ],
	        facultyQuery: "",
	        facultyResult: [],
	        originalFaculty: []

	    }
	    autobind(this);
 	}

  // what to do once the page (re)loads
	componentDidMount = () =>{
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    // listens on an endpoint and executes fallback function
		    socket.emit('view_all_active_faculty_members', 'dfesperanza@up.edu.ph');//send data to 'login' endpoint in server
		    socket.on('view_all_active_faculty_members', (returnValueFromServer) => {
		      console.log(returnValueFromServer);
          this.setState({faculty: returnValueFromServer});
          this.setState({originalFaculty: returnValueFromServer});
		    });
		  }
		  //a function for sending data to server.you can have many of these
		  sendData = () => {
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    socket.emit('login', 'this is my data');//send data to 'login' endpoint in server
	}

	handleSearch = (e) => {
		this.setState({facultyQuery: e.target.value});
		this.setState({faculty: this.state.originalFaculty});

	}

	searchFaculty = (e) => {
		if (this.state.facultyQuery != ""){
			this.setState({facultyResult: []});
			for (var j = 0; j < this.state.faculty.length; j++){
			  if (this.state.faculty[j].name.match(this.state.facultyQuery)){
			  	this.state.facultyResult.push(this.state.faculty[j]);
			  	console.log("Found Match.");
			  }
			}
			this.setState({faculty: this.state.facultyResult});
		}

		this.setState({facultyQuery: ""});
			
	}

  render() {
    return(
      <div className='FacultyTab'>
      		<Grid centered={true}>
      			<Grid.Row>
      				<Navbar />
      				<Heading />
      			</Grid.Row>

      			<Grid.Row>
					<Grid.Column width={9} verticalAlign="middle">
						<Grid.Row>
              <Card fluid={true}  id="inputWidth" >
                  <Input transparent={true} fluid={true} icon='search' iconPosition='left' placeholder = "Search faculty..." onChange={this.handleSearch}/>
              		<Button basic onClick={this.searchFaculty}>
              			Search
              		</Button>
              </Card>
			      </Grid.Row>
					</Grid.Column>
					<Grid.Column width={16} textAlign = "center">
						<Grid columns={4} divided centered>
            				<Container centered>
      								<Card.Group itemsPerRow={4}>
      									{this.state.faculty.map((item, index)=>
      										<Card>
                            { item.isRegCom === 0 ? (
                                <FacultyCard name={item.name} email={item.email_add} isRegCom={item.isRegCom}/>
                                ):(<RegComCard name={item.name} email={item.email_add} isRegCom={item.isRegCom}/>)
                            }
                          </Card>
      									)}

      								</Card.Group>
           					</Container>
						</Grid>
					</Grid.Column>
				</Grid.Row>
      		</Grid>
      </div>
    );
  }
}

export default FacultyTab;

/*
DELETE THE COMMENTS AFTER.
*/
