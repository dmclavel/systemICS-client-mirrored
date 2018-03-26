import React, { Component } from 'react';
import { Segment, Sticky, Menu, Button, Container } from 'semantic-ui-react';
import Heading from './Heading';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activetab: 'classes'
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
			        <Menu.Item name='classes' active={this.state.activetab === 'classes'} onClick={this.handleItemClick} />
			        <Menu.Item name='faculty'active={this.state.activetab === 'faculty'} onClick={this.handleItemClick} />
			        <Menu.Item name='rooms' active={this.state.activetab === 'rooms'} onClick={this.handleItemClick}/>
			      </Menu.Menu>
			      <Menu.Item name="log in button" position='right'
			        children={
			          <Button color='red'> LOGIN</Button>
			        }
			      />
  		    </Menu>
				</Segment>
			</div>
		);
	}
}

export default Navbar;
