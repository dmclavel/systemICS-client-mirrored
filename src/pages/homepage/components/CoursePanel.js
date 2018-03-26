import React, { Component } from 'react';
import { Segment, Container, Grid, Image, Button, Header } from 'semantic-ui-react';

const square = { width: 100, height: 100 };
const square1 = { width: 50, height: 50 };

const courses = [
	{ key: 1, course: "CMSC 128: Introduction to Software Engineering", desc: "Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.", prof: "Mr. Reginald Recario", profroom: "C-114", room: "ICSMH"},
	{ key: 2, course: "CMSC 128: Introduction to Software Engineering", desc: "Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.", prof: "Mr. Reginald Recario", profroom: "C-114", room: "ICSMH"},

	{ key: 3, course: "CMSC 128: Introduction to Software Engineering", desc: "Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.", prof: "Mr. Reginald Recario", profroom: "C-114", room: "ICSMH"}
];

class CoursePanel extends Component {
	render() {
		return (
			<div className="courses">
				{
					/* Hi, in the future, make it as another component */
					courses.map((course) =>
						<Segment fluid>
							<Grid divided>	
								<Grid.Row>
									<Grid.Column width={3}>
										<Segment inverted circular style={square}/>
									</Grid.Column>
									<Grid.Column width={10}>
										<Header textAlign='left'>
											<Header.Content>
												{course.course}
											</Header.Content>
											<Header.Subheader>
											{course.desc}
											</Header.Subheader>
										</Header>
										<Grid divided>
											<Grid.Row>
												<Grid.Column width={8}>
													<Header textAlign='left' size='small' icon="user outline" content={course.prof} subheader={course.profroom} />
												</Grid.Column>
												<Grid.Column width={8}>
													<Header textAlign='left' size='small' icon="users" content={course.room} subheader="Room" />
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
