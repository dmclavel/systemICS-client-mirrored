import React, { Component } from 'react';
import { Segment, Sticky, Menu, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Heading from './Heading';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activetab: 'home'
		};
	}

	handleContextRef = (contextRef) => this.setState({ contextRef }); 
	handleItemClick = (e, { name }) => this.setState({ activetab: name });

	render() {
		const { contextRef } = this.state;
		return (
			<div ref={this.handleContextRef}>
				<Segment inverted color='teal'  className="test">
					<Menu inverted fluid={true} pointing secondary attached='top' className="inline">
			      <Menu.Item name="SystemICS" position='left'/>
			      <Menu.Menu>
			      	<Link to='/'>
			        <Menu.Item name='home' active={this.state.activetab === 'home'} onClick={this.handleItemClick} />
			        </Link>

			        <Link to='classes'>
			        <Menu.Item name='classes' active={this.state.activetab === 'classes'} onClick={this.handleItemClick} />
			        </Link>

			        <Link to='faculty'>
			        <Menu.Item name='faculty'active={this.state.activetab === 'faculty'} onClick={this.handleItemClick} />
			        </Link>

			        <Link to='rooms'>
			        <Menu.Item name='rooms' active={this.state.activetab === 'rooms'} onClick={this.handleItemClick}/>
			        </Link>
			      </Menu.Menu>
			      <Menu.Item name="log in button" position='right'
			        children={
			        	<Link to='login'>
			          <Button color='red'> LOGIN</Button>
			          </Link>
			        }
			      />
  		    </Menu>
				</Segment>
			</div>
		);
	}
}

export default Navbar;
