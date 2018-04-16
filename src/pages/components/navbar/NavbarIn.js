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
import { Link, Redirect } from 'react-router-dom';
import Logo from './logo-transparent-no-stroke.png';

const options = [
  {
    key: 'today',
    text: 'today',
    value: 'today',
    content: 'Today',
    disabled : true
  },
  {
    key: 'this week',
    text: 'this week',
    value: 'this week',
    content: 'This Week',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'You are appointed as the lecturer for CMSC 22.',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
    disabled : true
  },
  {
    key: 'this month',
    text: 'this month',
    value: 'this month',
    content: 'This Month',
    disabled : true
  }
]


class NavbarIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : this.props.user,
      activeItem : this.props.active,
      isLoggedIn : true
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem : name });
  handleLogout = () => {
    const cachedLoggedIn = localStorage.getItem('login');
    if (cachedLoggedIn) {
      localStorage.setItem('login', null);
      this.setState({ isLoggedIn : false });
    }
  }

  render() {
    const { activeItem } = this.state;

    if (!this.state.isLoggedIn) {
      return (
        <Redirect to="/" push />
      )
    }

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
            <Grid.Column width={2} />
            <Grid.Column width={1} float='right'>
              <Dropdown icon='bell outline large bg-color-login notif-button' pointing='right' labeled button className='icon width notif-button-container bg-color-login' scrolling options={options} />  
            </Grid.Column>
            <Grid.Column width={2}>
              <Button className="notif-button-container bg-color-logout" content='Log out' icon="sign out alternate" onClick={this.handleLogout} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default NavbarIn;
