import React, { Component } from 'react';
import {
  Segment,
  Menu,
  Button,
  Container,
  Grid,
  Label,
  Dropdown,
  Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from './logo-transparent-no-stroke.png';


class NavbarIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : this.props.user,
      activeItem : this.props.active
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem : name });

  render() {
    const { activeItem } = this.state;
    return (
      <div className='nav-home'>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <a href="/"><img src={Logo} className="nav-logo" /></a>
              <div className="nav-name-container">
                <a href="/" className="nav-logo-name">SYSTEM<span className="font-white">ICS</span></a>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <Menu className="nav-menu-in" pointing secondary>
                <Link to="/admin/dashboard">
                  <Menu.Item className="nav-item" name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
                </Link>
                <Link to="/admin/manage/courses">
                  <Menu.Item className="nav-item" name='manage' active={activeItem === 'manage'} onClick={this.handleItemClick} />
                </Link>
              </Menu>
            </Grid.Column>
            <Grid.Column width={5}>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default NavbarIn;
