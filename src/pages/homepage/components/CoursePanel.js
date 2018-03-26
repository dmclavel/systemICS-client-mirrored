import React, { Component } from 'react';
import { Segment, Container, Grid, Image, Button, Header } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

const square = { width: 100, height: 100 };
const square1 = { width: 50, height: 50 };

class CoursePanel extends Component {
	constructor(props){
		super(props);
		this.state = {
			endpoint: 'http://10.0.5.153:3000',
			lecture: [
			{
				"time_start": "",
				"time_end": "",
				"room": "",
				"day": ""
			}
			]
		}
		autobind(this);
	}
	componentDidMount = () =>{
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    // listens on an endpoint and executes fallback function
		    socket.emit('view_all_lab_sections', 'dfesperanza@up.edu.ph');//send data to 'login' endpoint in server
		    socket.on('view_all_lab_sections', (returnValueFromServer) => {
		      console.log(returnValueFromServer);
          this.setState({lecture: returnValueFromServer});
		    });
		  }
		  //a function for sending data to server.you can have many of these
		  sendData = () => {
		    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
		    socket.emit('login', 'this is my data');//send data to 'login' endpoint in server
	}
	render() {
		return (
			<div className="courses">
				{
					/* Hi, in the future, make it as another component */
					this.state.lecture.map((item, index) =>
						<Segment fluid>
							<Grid divided>	
								<Grid.Row>
									<Grid.Column width={3}>
										<Segment inverted circular style={square}/>
									</Grid.Column>
									<Grid.Column width={10}>
										<Header textAlign='left'>
											<Header.Content>
												{item.course}
											</Header.Content>
											<Header.Subheader>
											{item.desc}
											</Header.Subheader>
										</Header>
										<Grid divided>
											<Grid.Row>
												<Grid.Column width={5}>
													<Header textAlign='left' size='small' icon="user" content={item.prof} subheader={item.profroom} />
												</Grid.Column>
												<Grid.Column width={6}>
													<Header textAlign='left' size='small' icon="marker" content={item.room} subheader="Room" />
												</Grid.Column>
												<Grid.Column width={5}>
													<Header textAlign='left' size='small' icon="clock" subheader="Time" >
													{item.time_start}:{item.time_end}
													</Header>
												</Grid.Column>
											</Grid.Row>
										</Grid>
									</Grid.Column>
									<Grid.Column width={3} verticalAlign='middle'>
										<Button content='Learn More' basic onClick={()=>{window.location = "/section"}}/>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Segment>
					)
				}
				<Button basic content='View More' />
			</div>
		);
	}
}

export default CoursePanel;
