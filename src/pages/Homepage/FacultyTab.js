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
import RegCommCard from './RegCommCard';
/*
If you wish to import other JS files, do it here.
*/

class FacultyTab extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	        endpoint:  'http://10.0.5.153:3000', // the address of the server
	        faculty: [
	        {"name": "Kim Ezekiel del Mundo", "email": "kldelmundo@up.edu.ph", "committee": "Registration Committee"},
	        {"name": "Ciara Mae Gotis", "email": "crgotis@up.edu.ph", "committee": "Faculty"},
	        {"name": "Dannah Esperanza", "email": "dfsesperanza@up.edu.ph", "committee": "Registration Committee"},
	        {"name": "Cedric Gaza", "email": "cgaza@up.edu.ph", "committee": "Registration Committee"},
	        {"name": "Jem Torres", "email": "jtorres@up.edu.ph", "committee": "Faculty"},
	        {"name": "Aaron Lagazon", "email": "alagazon@up.edu.ph", "committee": "Registration Committee"},
	        {"name": "Jem Torres", "email": "jtorres@up.edu.ph", "committee": "Faculty"},
	        {"name": "Aaron Lagazon", "email": "alagazon@up.edu.ph", "committee": "Registration Committee"},
	        {"name": "Jem Torres", "email": "jtorres@up.edu.ph", "committee": "Faculty"},
	        {"name": "Aaron Lagazon", "email": "alagazon@up.edu.ph", "committee": "Registration Committee"},
	        {"name": "Jem Torres", "email": "jtorres@up.edu.ph", "committee": "Faculty"}
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
    return(
      <div className='FacultyTab'>
      	<Container>
      		<Grid centered={true}>
      			<Grid.Row>
						<Grid.Column width={12} verticalAlign="middle">
							<Grid.Row>
								<Card id = "marginSearch" fluid={true} raised={true}>
					              <Card.Content>
					                <Input transparent={true} fluid={true} icon='search' iconPosition='left'/>
					              </Card.Content>
					            </Card>
				            </Grid.Row>
						</Grid.Column>
						<Grid.Column width={16} textAlign = "center">
							<Grid columns={4} divided>
									
								
									{this.state.faculty.map((item, index)=>
										<div>
										{item.committee == "Registration Committee" &&
											<RegCommCard name={item.name} email={item.email} committee={item.committee}/>
										}
										{item.committee == "Faculty" &&
											<FacultyCard name={item.name} email={item.email} committee={item.committee}/>
										}
										</div>	
									)}
									
								
							</Grid>
						</Grid.Column>
				</Grid.Row>
      		</Grid>
      	</Container>
      </div>
    );
  }
}

export default FacultyTab;

/*
DELETE THE COMMENTS AFTER.
*/
