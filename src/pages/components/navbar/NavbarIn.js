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

const inlinestyle = {
  'padding-top': '0rem',
  'padding-bottom': '0rem'
};

const trigger = (
  <Button icon='user' />
)

const options = [
  {
    key: 'user',
    text: <span>Signed in as <strong>Bob Smith</strong></span>,
    disabled: true,
  },
  { key: 'profile', text: 'Your Profile' },
  { key: 'stars', text: 'Your Stars' },
  { key: 'explore', text: 'Explore' },
  { key: 'integrations', text: 'Integrations' },
  { key: 'help', text: 'Help' },
  { key: 'settings', text: 'Settings' },
  { key: 'sign-out', text: 'Sign Out' },
]

class NavbarIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activetab: 'dashboard'
    };
  }

  handleContextRef = contextRef => this.setState({ contextRef });
  handleItemClick = (e, { name }) => this.setState({ activetab: name });

  render() {
    const { contextRef } = this.state;
    return (
      <div ref={this.handleContextRef} className="test">
        <Segment inverted className="navbar-color">
          <Menu inverted fluid={true} pointing secondary attached="top">
            <Menu.Item name="SystemICS" position="left" />
            <Menu.Menu>
              <Link to="dashboard">
                <Menu.Item
                  name="dashboard"
                  active={this.state.activetab === 'dashboard'}
                  onClick={this.handleItemClick}
                />
              </Link>

              <Link to={this.props.user.localeCompare('admin') === 0? "manage/courses" : "manage/teaching"}>
                <Menu.Item
                  name='manage'
                  active={this.state.activetab === 'manage'}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
            <Menu.Item
              name="log in button"
              position="right"
              children={
                <Grid>
                  <Grid.Row style={inlinestyle}>
                    <Grid.Column width={8}>
                      {/*<Button icon="bell outline" circular />
                      <Label
                        attached="top right"
                        content="2"
                        color="red"
                        circular
                      />*/}

                    <Dropdown simple trigger={trigger} options={options} direction='left' />
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
