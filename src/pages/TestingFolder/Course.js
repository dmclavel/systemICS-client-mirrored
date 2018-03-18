import React, { Component } from 'react';
import { Segment, Container, Grid, Image, Button, Header } from 'semantic-ui-react';

const square = { width: 100, height: 100 };
const square1 = { width: 50, height: 50 };

class Course extends Component {
	render() {
		return (
			<div className="courses">
				<br />
				<Segment fluid>
					<Grid divided>	
						<Grid.Row>
							<Grid.Column width={3}>
								<Segment inverted circular style={square}/>
							</Grid.Column>
							<Grid.Column width={10}>
								<Header textAlign='left'>
									<Header.Content>
									CMSC128: Introduction to Software Engineering
									</Header.Content>
									<Header.Subheader>
									Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.
									</Header.Subheader>
								</Header>
								<Grid divided>
									<Grid.Row>
										<Grid.Column width={8}>
											<Header textAlign='left' size='small' icon="user outline" content="Mr. Reginald Recario" subheader="C-114" />
										</Grid.Column>
										<Grid.Column width={8}>
											<Header textAlign='left' size='small' icon="users" content="Tentative" subheader="Tentative" />
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
				<Segment fluid>
					<Grid divided>	
						<Grid.Row>
							<Grid.Column width={3}>
								<Segment inverted circular style={square}/>
							</Grid.Column>
							<Grid.Column width={10}>
								<Header textAlign='left'>
									<Header.Content>
									CMSC128: Introduction to Software Engineering
									</Header.Content>
									<Header.Subheader>
									Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.
									</Header.Subheader>
								</Header>
								<Grid divided>
									<Grid.Row>
										<Grid.Column width={8}>
											<Header textAlign='left' size='small' icon="user outline" content="Mr. Reginald Recario" subheader="C-114" />
										</Grid.Column>
										<Grid.Column width={8}>
											<Header textAlign='left' size='small' icon="users" content="Tentative" subheader="Tentative" />
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
				<Segment fluid>
					<Grid divided>	
						<Grid.Row>
							<Grid.Column width={3}>
								<Segment inverted circular style={square}/>
							</Grid.Column>
							<Grid.Column width={10}>
								<Header textAlign='left'>
									<Header.Content>
									CMSC128: Introduction to Software Engineering
									</Header.Content>
									<Header.Subheader>
									Principles and methods for the design, implementation, validation, evaluation and maintenance of software systems.
									</Header.Subheader>
								</Header>
								<Grid divided>
									<Grid.Row>
										<Grid.Column width={8}>
											<Header textAlign='left' size='small' icon="user outline" content="Mr. Reginald Recario" subheader="C-114" />
										</Grid.Column>
										<Grid.Column width={8}>
											<Header textAlign='left' size='small' icon="users" content="Tentative" subheader="Tentative" />
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
				<Button basic content='View More' />
				<br />
				<br />
				<br />
				<Segment fluid>
					<Grid divided>	
						<Grid.Row>
							<Grid.Column width={3}>
								<Segment inverted circular style={square1}/>
							</Grid.Column>
							<Grid.Column width={10}>
								<Header textAlign='left'>
									<Header.Content>
									Mr. Reginald Recario
									</Header.Content>
									<Header.Subheader>
									C-114
									</Header.Subheader>
								</Header>
								<Grid divided>
									<Grid.Row>
										<Grid.Column width={8}>
											<Header textAlign='left' size='tiny' icon="users" content="310 students" subheader="Tentative" />
										</Grid.Column>
										<Grid.Column width={8}>
											<Header textAlign='left' size='tiny' icon="users" content="20 Teaching Load" subheader="Tentative" />
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Grid.Column>
							<Grid.Column width={3} verticalAlign='middle'>
								<Button content='Edit Load' basic />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</div>
		);
	}
}

export default Course;
