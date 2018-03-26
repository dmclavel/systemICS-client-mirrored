import React, { Component } from 'react';
import { Segment, Menu, Button, Container, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Heading from './Heading';

const inlinestyle = {
	"padding-top" : "0rem",
	"padding-bottom" : "0rem"
}

class NavbarIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activetab: 'dashboard'
		};
	}

	handleContextRef = (contextRef) => this.setState({ contextRef }); 
	handleItemClick = (e, { name }) => this.setState({ activetab: name });

	render() {
		const { contextRef } = this.state;
		return (
			<div ref={this.handleContextRef} className="test">
				<Segment inverted color='teal'>
					<Menu inverted fluid={true} pointing secondary attached='top'>
			      <Menu.Item name="SystemICS" position='left'/>
			      <Menu.Menu>
			      	<Link to='dashboard'>
			        <Menu.Item name='admin/dashboard' active={this.state.activetab === 'dashboard'} onClick={this.handleItemClick} />
			        </Link>

			        <Menu.Item name='manage' active={this.state.activetab === 'manage'} onClick={this.handleItemClick} />
			      </Menu.Menu>
			      <Menu.Item name="log in button" position='right'
			        children={
			          <Grid>
			          	<Grid.Row style={inlinestyle}>
			          		<Grid.Column width={8}>
			          			<Button icon="bell outline" circular />
			          			<Label attached="top right" content="2" color="red" circular />
			          		</Grid.Column>
			          		<Grid.Column width={8}>
			          			<Button icon="setting" circular />
			          		</Grid.Column>
			          	</Grid.Row>
			          </Grid>
			        }
			      />
  		    </Menu>
				</Segment>
			</div>
		);
	}
}

export default NavbarIn;
