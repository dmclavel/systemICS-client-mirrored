/*
AUTHOR: Gotis, Ciara Mae
		Esperanza, Dannah
FILE: FacultyTab, to be used for basic JS pages in the system.

BASIC TEMPLATE FOR ALL JS PAGES
DO NOT FORGET TO DOCUMENT YOUR OWN CODE.
Change name FacultyTab to the name of file.
This will be updated for mapping, grid layouting, etc.
Write the Author of the code at the top of the document.
*/
import {Image, Card, Button, Input, Grid, Container, Search, Header, Modal, Icon, Checkbox, Accordion, Segment} from "semantic-ui-react";
import React, { Component } from 'react';
import autobind from 'react-autobind';
import SectionCard from './SectionCard';
import socketIOClient from 'socket.io-client';
/*
If you wish to import other JS files, do it here.
*/

class Section extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	        endpoint: 'https://sleepy-falls-95372.herokuapp.com/', // the address of the server
	    	lab: [
	        {
			"time_start": "",
			"time_end": "",
			"room": "",
			"day": "",
			"section": "",
			"course_name": "",
			"course_title": "",
			"name": ""}
	        ],

	        
	    }
	    autobind(this);
 	}

  // what to do once the page (re)loads
	componentDidMount = () =>{
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    // listens on an endpoint and executes fallback function
		    socket.emit('view_all_lab_sections', 'dfesperanza@up.edu.ph');//send data to 'login' endpoint in server
		    socket.on('view_all_lab_sections', (returnValueFromServer) => {
		      console.log(returnValueFromServer);
		    this.setState({lab: returnValueFromServer});
		    });
		  }
		  //a function for sending data to server.you can have many of these
		  sendData = () => {
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    socket.emit('login', 'this is my data');//send data to 'login' endpoint in server
	}
  render() {
    return(
      <div className='LabSectionTab'>
      	<Container>
      		<Grid centered={true}>
      			<Grid.Row>
					<Grid.Column width={12} verticalAlign="middle">
						<Grid.Row>
							<Card id = "marginSearch" fluid={true} raised={true}>
				              <Card.Content>
				                <Input transparent={true} fluid={true} icon='search' iconPosition='left' placeholder = "Search laboratory sections..."/>
				              </Card.Content>
				            </Card>
			            </Grid.Row>
					</Grid.Column>
					{this.props.section}
					<Grid.Column width={16} textAlign = "center">
						<Grid columns={4} divided centered>
            				<Container centered>
								<Card.Group itemsPerRow={4}>
									{this.state.lab.map((item, index)=>
										<div>
										{this.props.section == item.course_name.replace(/\s+/, "") && (
											<SectionCard name={item['name']} course_name={item['course_name']} section={item['section']} day={item['day']} timestart={item['time_start']} timeend={item['time_end']} room={item['room']} />
										)}
										</div>
									)}

								</Card.Group>
           					</Container>

						</Grid>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Button primary textAlign="center" onClick={()=>{window.location = "/"}}>
					Back to lecture

					</Button>
				</Grid.Row>
      		</Grid>
      	</Container>
      </div>
    );
  }
}

export default Section;

/*
DELETE THE COMMENTS AFTER.
*/
