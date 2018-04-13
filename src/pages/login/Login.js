/*
AUTHOR: Gaza, John Cedric C.
FILE: Login, for the basic log-in page. Includes google sign-in.
*/

import React, { Component } from 'react';
import { Grid, Button, Form, Segment, Menu, Header } from 'semantic-ui-react';
import { GoogleAPI, GoogleLogin } from 'react-google-oauth';
import socketIOClient from 'socket.io-client';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem : 'admin',
      profile : null,
      timestamp: 'no timestamp yet',
      endpoint: 'https://sleepy-falls-95372.herokuapp.com/',
    };
  }

  handleActiveItem = (e, { name }) => this.setState({ activeItem : name });
  handleProfile = (googleUser) => {
    this.setState({ profile: googleUser.getBasicProfile() });
    console.log(this.state.profile);
    this.props.logInHandler(this.state.profile);
  };

  componentDidMount(){
    const socket = socketIOClient(this.state.endpoint)
    socket.on('login', (name) => {
      console.log(name);
    });
  }

  send = (e) => {
    const socket = socketIOClient(this.state.endpoint)
    socket.emit('login', e.target.value)
  }

  render() {

    const { activeItem } = this.state;

    return(
      <div className='login-form'>
        <Grid textAlign='center' columns={1} verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header>
                system-ICS
              </Header>
              <Segment stacked>
                <Menu fluid widths={2}>
                  <Menu.Item name='admin' content='Admin' active={activeItem === 'admin'} onClick={this.handleActiveItem}></Menu.Item>
                  <Menu.Item name='faculty' content='Faculty' active={activeItem === 'faculty'} onClick={this.handleActiveItem}></Menu.Item>
                </Menu>
                {
                  (activeItem === 'admin') ?
                  <div>
                    <Form>
                      <Form.Input placeholder='Username' icon='user' iconPosition='left' onChange={this.send}/>
                      <Form.Input placeholder='Password' icon='lock' iconPosition='left' type='password'/>
                      <Button content='Log in' fluid color={'teal'}/>
                    </Form>
                  </div>
                  :
                  <div>
                    <GoogleAPI clientId="175573341301-f0qqirbda07fqsqam42vjpoi1kldjro4.apps.googleusercontent.com"
                          onUpdateSigninStatus={Function}
                          onInitFailure={Function} >
                        <div>
                             <GoogleLogin onLoginSuccess={this.handleProfile}/>
                        </div>
                    </GoogleAPI>
                  </div>
                }
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Login;
