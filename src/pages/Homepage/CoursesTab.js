/*
AUTHOR: Gotis, Ciara Mae R.
		Esperanza, Dannah Louise F.
FILE: 	Homepage; contains the lecture and lab sections of CMSC subjects
*/

import {Card, Button, Input, Grid, Container, Search, Header, Modal, Icon, Checkbox, Accordion} from "semantic-ui-react";
import React, {Component} from "react";
import autobind from "react-autobind";
import HomeNav from '../../components/HomeNav';

const inlineStyle = {
  modal : {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class CoursesTab extends Component{
	constructor(props){
		super(props);
		this.state={
			query: ''
		}
		autobind(this);
	}

	handleQuery(e){
		this.setState({query: e.target.value});
		// this.state.query = e.target.value;
		console.log(this.state.query);
	}
	state = { activeIndex: 0 }

	 handleClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
	  }
	render(){
		const { activeIndex } = this.state
		return(
			// Returns an Accordion that contains the lecture sections; Lab sections displayed using Cards
			<div>
				<HomeNav />
				<Container>
				<Grid centered={true}>
					<Grid.Row>
						<Grid.Column width={10} verticalAlign="middle">
							<Input placeholder = {this.props.placeholder} fluid={true}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={10} verticalAlign="middle">
							<Header as='h1' color='teal' floated='left'>Course List</Header>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={10} >
							<Accordion styled fluid={true}>
						        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
						          <Icon name='dropdown' />
						          CMSC 2: Introduction to the Internet
						        </Accordion.Title>
						        <Accordion.Content active={activeIndex === 0}>
						        <Button.Group vertical fluid>
						        	<Modal style={inlineStyle.modal} trigger={
								<Button color='teal' >CMSC 2 E</Button>
							}>
								 <Modal.Header >
								 	<Header textAlign='center'>CMSC 2: Introduction to the Internet</Header>
								 	<center><p textAlign='center'>
								 	Patrick Albacea<br/>
								 	TTh 3:00pm-4:00pm | ICSMH</p></center>
								 </Modal.Header>
								 <Modal.Content image>
								 	<Container>
										 <Modal.Description>
										 	<Grid columns={3} divided>
											 	<Grid.Row>
											 		<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
																 <Card.Header>CMSC 2 E-2L</Card.Header>
																 <Card.Meta>10:00-1:00</Card.Meta>
																 <Card.Description>PC LAB 8</Card.Description>
															 </Card.Content>
														 </Card>
													</Grid.Column>
													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
															 <Card.Header>CMSC 2 E-3L</Card.Header>
															 <Card.Meta>1:00-4:00</Card.Meta>
															 <Card.Description>PC LAB 9</Card.Description>
																</Card.Content>
														 </Card>
													</Grid.Column>

													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
														 <Card.Content>
														 <Card.Header>CMSC 2 E-4L</Card.Header>
														 <Card.Meta>4:00-7:00</Card.Meta>
														 <Card.Description>PC LAB 2</Card.Description>
															</Card.Content>
														 </Card>
													</Grid.Column>

												</Grid.Row>
											</Grid>


										 </Modal.Description>
									</Container>
								 </Modal.Content>
							 	</Modal>
						          <Modal style={inlineStyle.modal} trigger={
								<Button color='teal' >CMSC 2 F</Button>
							}>
								 <Modal.Header >
								 	<Header textAlign='center'>CMSC 2: Introduction to the Internet</Header>
								 	<center><p textAlign='center'>
								 	Maureen Lauron<br/>
								 	WF 10:00am-11:00am | ICSMH</p></center>
								 </Modal.Header>
								 <Modal.Content image>
								 	<Container>
										 <Modal.Description>
										 	<Grid columns={3} divided>
											 	<Grid.Row>
											 		<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
																 <Card.Header>CMSC 2 F-1L</Card.Header>
																 <Card.Meta>10:00-1:00</Card.Meta>
																 <Card.Description>PC LAB 8</Card.Description>
															 </Card.Content>
														 </Card>
													</Grid.Column>
													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
															 <Card.Header>CMSC 2 F-2L</Card.Header>
															 <Card.Meta>1:00-4:00</Card.Meta>
															 <Card.Description>PC LAB 9</Card.Description>
																</Card.Content>
														 </Card>
													</Grid.Column>

													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
														 <Card.Content>
														 <Card.Header>CMSC 2 F-2L</Card.Header>
														 <Card.Meta>4:00-7:00</Card.Meta>
														 <Card.Description>PC LAB 2</Card.Description>
															</Card.Content>
														 </Card>
													</Grid.Column>

												</Grid.Row>
											</Grid>


										 </Modal.Description>
									</Container>
								 </Modal.Content>
							 	</Modal>
						        </Button.Group>
						        </Accordion.Content>

						        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
						          <Icon name='dropdown' />
						          CMSC 11: Introduction to Computer Science
						        </Accordion.Title>
						       <Accordion.Content active={activeIndex === 1}>
						        <Button.Group vertical fluid>
						        		<Modal style={inlineStyle.modal} trigger={
								<Button color='teal' >CMSC 11 ST</Button>
							}>
								 <Modal.Header >
								 	<Header textAlign='center'>CMSC 11: Introduction to Computer Science</Header>
								 	<center><p textAlign='center'>
								 	Patrick Albacea<br/>
								 	TTh 3:00pm-4:00pm | ICSMH</p></center>
								 </Modal.Header>
								 <Modal.Content image>
								 	<Container>
										 <Modal.Description>
										 	<Grid columns={3} divided>
											 	<Grid.Row>
											 		<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
																 <Card.Header>CMSC 11 ST-2L</Card.Header>
																 <Card.Meta>10:00-1:00</Card.Meta>
																 <Card.Description>PC LAB 8</Card.Description>
															 </Card.Content>
														 </Card>
													</Grid.Column>
													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
															 <Card.Header>CMSC 11 ST-3L</Card.Header>
															 <Card.Meta>1:00-4:00</Card.Meta>
															 <Card.Description>PC LAB 9</Card.Description>
																</Card.Content>
														 </Card>
													</Grid.Column>

													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
														 <Card.Content>
														 <Card.Header>CMSC 11 ST-4L</Card.Header>
														 <Card.Meta>4:00-7:00</Card.Meta>
														 <Card.Description>PC LAB 2</Card.Description>
															</Card.Content>
														 </Card>
													</Grid.Column>

												</Grid.Row>
											</Grid>


										 </Modal.Description>
									</Container>
								 </Modal.Content>
							 	</Modal>
						          <Modal style={inlineStyle.modal} trigger={
								<Button color='teal' >CMSC 11 UV</Button>
							}>
								 <Modal.Header >
								 	<Header textAlign='center'>CMSC 11: Introduction to Computer Science</Header>
								 	<center><p textAlign='center'>
								 	Patrick Albacea<br/>
								 	TTh 3:00pm-4:00pm | ICSMH</p></center>
								 </Modal.Header>
								 <Modal.Content image>
								 	<Container>
										 <Modal.Description>
										 	<Grid columns={3} divided>
											 	<Grid.Row>
											 		<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
																 <Card.Header>CMSC 11 UV-2L</Card.Header>
																 <Card.Meta>10:00-1:00</Card.Meta>
																 <Card.Description>PC LAB 8</Card.Description>
															 </Card.Content>
														 </Card>
													</Grid.Column>
													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
															 <Card.Header>CMSC 11 UV-3L</Card.Header>
															 <Card.Meta>1:00-4:00</Card.Meta>
															 <Card.Description>PC LAB 9</Card.Description>
																</Card.Content>
														 </Card>
													</Grid.Column>

													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
														 <Card.Content>
														 <Card.Header>CMSC 11 UV-4L</Card.Header>
														 <Card.Meta>4:00-7:00</Card.Meta>
														 <Card.Description>PC LAB 2</Card.Description>
															</Card.Content>
														 </Card>
													</Grid.Column>

												</Grid.Row>
											</Grid>


										 </Modal.Description>
									</Container>
								 </Modal.Content>
							 	</Modal>
						        </Button.Group>
						        </Accordion.Content>

						        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
						          <Icon name='dropdown' />
						          CMSC 21: Fundamentals of Programming
						        </Accordion.Title>
						        <Accordion.Content active={activeIndex === 2}>
						        <Button.Group vertical fluid>
						          	<Modal style={inlineStyle.modal} trigger={
								<Button color='teal' >CMSC 21 U</Button>
							}>
								 <Modal.Header >
								 	<Header textAlign='center'>CMSC 21: Fundamentals of Programming</Header>
								 	<center><p textAlign='center'>
								 	Patrick Albacea<br/>
								 	TTh 3:00pm-4:00pm | ICSMH</p></center>
								 </Modal.Header>
								 <Modal.Content image>
								 	<Container>
										 <Modal.Description>
										 	<Grid columns={3} divided>
											 	<Grid.Row>
											 		<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
																 <Card.Header>CMSC 21 U-2L</Card.Header>
																 <Card.Meta>10:00-1:00</Card.Meta>
																 <Card.Description>PC LAB 8</Card.Description>
															 </Card.Content>
														 </Card>
													</Grid.Column>
													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
															 <Card.Header>CMSC 21 U-3L</Card.Header>
															 <Card.Meta>1:00-4:00</Card.Meta>
															 <Card.Description>PC LAB 9</Card.Description>
																</Card.Content>
														 </Card>
													</Grid.Column>

													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
														 <Card.Content>
														 <Card.Header>CMSC 21 U-4L</Card.Header>
														 <Card.Meta>4:00-7:00</Card.Meta>
														 <Card.Description>PC LAB 2</Card.Description>
															</Card.Content>
														 </Card>
													</Grid.Column>

												</Grid.Row>
											</Grid>


										 </Modal.Description>
									</Container>
								 </Modal.Content>
							 	</Modal>
						          <Modal style={inlineStyle.modal} trigger={
								<Button color='teal' >CMSC 21 V</Button>
							}>
								 <Modal.Header >
								 	<Header textAlign='center'>CMSC 21: Fundamentals of Programming</Header>
								 	<center><p textAlign='center'>
								 	Patrick Albacea<br/>
								 	TTh 3:00pm-4:00pm | ICSMH</p></center>
								 </Modal.Header>
								 <Modal.Content image>
								 	<Container>
										 <Modal.Description>
										 	<Grid columns={3} divided>
											 	<Grid.Row>
											 		<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
																 <Card.Header>CMSC 21 V-2L</Card.Header>
																 <Card.Meta>10:00-1:00</Card.Meta>
																 <Card.Description>PC LAB 8</Card.Description>
															 </Card.Content>
														 </Card>
													</Grid.Column>
													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
															 <Card.Content>
															 <Card.Header>CMSC 21 V-3L</Card.Header>
															 <Card.Meta>1:00-4:00</Card.Meta>
															 <Card.Description>PC LAB 9</Card.Description>
																</Card.Content>
														 </Card>
													</Grid.Column>

													<Grid.Column>
														 <Card id = "cardMargin" href='#card-example-link-card'>
														 <Card.Content>
														 <Card.Header>CMSC 21 V-4L</Card.Header>
														 <Card.Meta>4:00-7:00</Card.Meta>
														 <Card.Description>PC LAB 2</Card.Description>
															</Card.Content>
														 </Card>
													</Grid.Column>

												</Grid.Row>
											</Grid>


										 </Modal.Description>
									</Container>
								 </Modal.Content>
							 	</Modal>
						        </Button.Group>
						        </Accordion.Content>
						      </Accordion>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				</Container>
			</div>
		);
	}
}

export default CoursesTab;
