/*
AUTHOR: del Mundo, Kim Ezekiel L.
The nav bar to be used in the homepage

*/

import React, { Component } from 'react';
import {Menu, Button, Image, Segment, Grid} from 'semantic-ui-react';
import autobind from 'react-autobind';
import Notifier from './Notifier';

/*
If you wish to import other JS files, do it here.
*/

class LoggedInNavBar extends Component {
  constructor(props){
    super(props);
    this.state={
      activetab: 'Faculty',
      imageSrc: 'https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg',
      hasFaculty: false,
      hasRegCom: false,
      hasFaculty: false,
      notifCount: 0

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
        <Menu.Item name='Faculty' active={this.state.activetab === 'Faculty'} content='Faculty' onClick={this.handleItemClick} />
        <Menu.Item name='Reg Com'active={this.state.activetab === 'Reg Com'} content='Reg Com' onClick={this.handleItemClick} />
        <Menu.Item name='Admin' active={this.state.activetab === 'Admin'} content='Admin' onClick={this.handleItemClick}/>
      </Menu.Menu>

      <Menu.Item name="log in button" position='right'
        children={
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
              <Notifier icon='bell'notifCount={this.state.notifCount}/>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src={this.state.imageSrc} rounded={true} size='mini' avatar={true}/>
              </Grid.Column>

            </Grid.Row>

          </Grid>
        }
      />
      </Menu>
    );
  }
}


export default LoggedInNavBar;
