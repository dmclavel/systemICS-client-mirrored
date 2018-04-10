/*
AUTHOR: del Mundo, Kim Ezekiel L.
The nav bar to be used in the homepage

*/

import React, { Component } from 'react';
import {Menu, Button, Segment} from 'semantic-ui-react';
import autobind from 'react-autobind';

/*
If you wish to import other JS files, do it here.
*/

class HomeNav extends Component {
  constructor(props){
    super(props);
    this.state={
      activetab: 'classes'
    }
    autobind(this);
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activetab: name });
  }

  render() {
    return(
      <Menu fluid={true} borderless={true} pointing secondary attached='top'>
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
    );
  }
}

export default HomeNav;
