import React, { Component } from 'react';
import { Segment, Container, Grid, Image, Button, Header } from 'semantic-ui-react';
import './Heading.css';

const square = { width: 100, height: 100 };
const square1 = { width: 50, height: 50 };

class CourseCard extends Component {
	render() {
		return (

				<Segment fluid>
					<Grid divided>	
						<Grid.Row>
							<Grid.Column width={3}>
								<Segment inverted circular style={square}/>
							</Grid.Column>
							<Grid.Column width={10}>
								<Header textAlign='left'>
									<Header.Content>
									{this.props.course_number}:{this.props.course_title}
									</Header.Content>
									<Header.Subheader>
									{this.props.course_description}
									</Header.Subheader>
								</Header>
								<Grid divided>
									<Grid.Row>
										<Grid.Column width={5}>
											<Header textAlign='left' size='small' icon="user" content={this.props.course_instructor} subheader={this.props.course_instructor_room} />
										</Grid.Column>
										<Grid.Column width={6}>
											<Header textAlign='left' size='small' icon="marker" content="Room" subheader={this.props.course_room} />
										</Grid.Column>
										<Grid.Column width={5}>
											<Header textAlign='left' size='small' icon="clock" content="Schedule" subheader={this.props.course_schedule} />
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Grid.Column>
							<Grid.Column width={3} verticalAlign='middle'>
								<Button content='Learn More' basic />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
				
		);
	}
}

export default CourseCard;
