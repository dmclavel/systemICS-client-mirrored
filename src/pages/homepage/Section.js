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
	        endpoint: 'http://10.0.5.153:3000' // the address of the server
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
						<Grid.Column width={16} verticalAlign="middle">
							<Grid columns={4} divided>
								<Grid.Row>
									<Grid.Column>
										<SectionCard/>
									</Grid.Column>
									<Grid.Column>
										<SectionCard/>
									</Grid.Column>
									<Grid.Column>
										<SectionCard/>
									</Grid.Column>
									<Grid.Column>
										<SectionCard/>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row>
									<Grid.Column>
										<SectionCard/>
									</Grid.Column>
									<Grid.Column>
										<SectionCard/>
									</Grid.Column>
									<Grid.Column>
										<SectionCard/>
									</Grid.Column>
									<Grid.Column>
										<SectionCard/>
									</Grid.Column>
								</Grid.Row>
								
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
