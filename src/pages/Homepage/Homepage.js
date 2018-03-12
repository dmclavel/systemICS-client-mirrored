/*
AUTHOR: Gotis, Ciara Mae R.
FILE: Homepage

*/


import {Card, Button, Input, Grid, Container, Search, Header, Modal, Icon, Checkbox} from "semantic-ui-react";
import React, {Component} from "react";
import autobind from "react-autobind";
import './Homepage.css';

const inlineStyle = {
  modal : {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class Homepage extends Component{
	constructor(props){
		super(props);
		this.state={
			query: ''
		}
		autobind(this);
	}

	render(){
		return(
			<div>
				<Container>
				<Grid centered={true}>
					<Grid.Row>
					/*
					it returns 4 buttons that pops up modals for lab section
					*/
						<Grid.Column width={8} verticalAlign="middle">
							<Input placeholder = {this.props.placeholder} fluid={true}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8} verticalAlign="middle">
							<Header as='h1' color='teal' floated='left'>Course List</Header>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8} >
							<Modal style={inlineStyle.modal} trigger={
								<Button id = "addSpace" fluid size = 'huge' fluid color='teal' floated='left'>CMSC 2: Introduction to the Internet</Button>
							}>
								 <Modal.Header>Laboratory Section</Modal.Header>
								 <Modal.Content image>
									 <Modal.Description>
									 <Card.Group>
										 <Card href='#card-example-link-card'>
											 <Card.Content>
												 <Card.Header>CMSC 2 E-2L</Card.Header>
												 <Card.Meta>10:00-1:00</Card.Meta>
												 <Card.Description>PC LAB 8</Card.Description>
											 </Card.Content>
										 </Card>

										 <Card href='#card-example-link-card'>
											 <Card.Content>
											 <Card.Header>CMSC 2 E-3L</Card.Header>
											 <Card.Meta>1:00-4:00</Card.Meta>
											 <Card.Description>PC LAB 9</Card.Description>
												</Card.Content>
										 </Card>

										 <Card href='#card-example-link-card'>
										 <Card.Content>
										 <Card.Header>CMSC 2 E-4L</Card.Header>
										 <Card.Meta>4:00-7:00</Card.Meta>
										 <Card.Description>PC LAB 2</Card.Description>
											</Card.Content>
										 </Card>

										</Card.Group>
									 </Modal.Description>
								 </Modal.Content>
							 </Modal>
							<Modal style={inlineStyle.modal} trigger={
								<Button id = "addSpace" fluid size = 'huge' fluid color='teal' floated='left'>CMSC 11: Introduction to Computer Science</Button>
							}>
								 <Modal.Header>Laboratory Section</Modal.Header>
								 <Modal.Content image>
									 <Modal.Description>
									 <Card.Group>
										 <Card href='#card-example-link-card'>
											 <Card.Content>
												 <Card.Header>CMSC 2 E-2L</Card.Header>
												 <Card.Meta>10:00-1:00</Card.Meta>
												 <Card.Description>PC LAB 8</Card.Description>
											 </Card.Content>
										 </Card>

										 <Card href='#card-example-link-card'>
											 <Card.Content>
											 <Card.Header>CMSC 2 E-3L</Card.Header>
											 <Card.Meta>1:00-4:00</Card.Meta>
											 <Card.Description>PC LAB 9</Card.Description>
												</Card.Content>
										 </Card>

										 <Card href='#card-example-link-card'>
										 <Card.Content>
										 <Card.Header>CMSC 2 E-4L</Card.Header>
										 <Card.Meta>4:00-7:00</Card.Meta>
										 <Card.Description>PC LAB 2</Card.Description>
											</Card.Content>
										 </Card>

										</Card.Group>
									 </Modal.Description>
								 </Modal.Content>
							 </Modal>
							<Modal style={inlineStyle.modal} trigger={
								<Button id = "addSpace" fluid size = 'huge' fluid color='teal' floated='left'>CMSC 21: Fundamentals of Programming</Button>
							}>
								 <Modal.Header>Laboratory Section</Modal.Header>
								 <Modal.Content image>
									 <Modal.Description>
									 <Card.Group>
										 <Card href='#card-example-link-card'>
											 <Card.Content>
												 <Card.Header>CMSC 2 E-2L</Card.Header>
												 <Card.Meta>10:00-1:00</Card.Meta>
												 <Card.Description>PC LAB 8</Card.Description>
											 </Card.Content>
										 </Card>

										 <Card href='#card-example-link-card'>
											 <Card.Content>
											 <Card.Header>CMSC 2 E-3L</Card.Header>
											 <Card.Meta>1:00-4:00</Card.Meta>
											 <Card.Description>PC LAB 9</Card.Description>
												</Card.Content>
										 </Card>

										 <Card href='#card-example-link-card'>
										 <Card.Content>
										 <Card.Header>CMSC 2 E-4L</Card.Header>
										 <Card.Meta>4:00-7:00</Card.Meta>
										 <Card.Description>PC LAB 2</Card.Description>
											</Card.Content>
										 </Card>

										</Card.Group>
									 </Modal.Description>
								 </Modal.Content>
							 </Modal>
						</Grid.Column>
					</Grid.Row>

				</Grid>
				</Container>
			</div>
		);
	}
}

export default Homepage;
