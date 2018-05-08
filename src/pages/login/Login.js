/*
AUTHOR: Gaza, John Cedric C.
FILE: Login, for the basic log-in page. Includes google sign-in.
*/

import React, { Component } from 'react';
import { Grid, Button, Image, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { GoogleAPI, GoogleLogin } from 'react-google-oauth';
import socketIOClient from 'socket.io-client';
import './Login.css';
import Logo from './logo-transparent-no-stroke.png';
import config from '../../config.json';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      timestamp: 'no timestamp yet',
      endpoint: config.backendAddress, // the address of the server
      accessLvl: 0,
      message: '',
      success: true,
      username: '',
      password: ''
    };
  }

  handleProfile = googleUser => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('view_faculty', { email_add: googleUser.getBasicProfile().U3 });
    socket.on('view_faculty', res => {
      if (res !== {}) {
        this.setState({
          accessLvl: res.isRegCom,
          success: true
        });
        this.props.logInHandler(googleUser.getBasicProfile(), res.isRegCom);
        window.location = '/';
      } else {
        this.setState({
          success: false,
          message: `${
            googleUser.getBasicProfile().U3
          } is not found in database.`
        });
      }
    });
  };

  render() {
    const { success, message } = this.state;
    return (
      <div className="login-form">
        <Grid textAlign="center" columns={3} verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={5} />
            <Grid.Column style={{ maxWidth: 450 }}>
              <div>
                <Image className="login-name" src={Logo} size="small" />{' '}
                <p className="login-logo-name">SYSTEMICS</p>
              </div>

              {!success && (
                <Message
                  error
                  header="Error!"
                  icon="delete"
                  content={message}
                />
              )}

              <div>
                <GoogleAPI
                  clientId="175573341301-f0qqirbda07fqsqam42vjpoi1kldjro4.apps.googleusercontent.com"
                  onUpdateSigninStatus={Function}
                  onInitFailure={Function}
                >
                  <div>
                    <GoogleLogin onLoginSuccess={this.handleProfile} />
                  </div>
                </GoogleAPI>
              </div>

              <Link to="/">
                <Button icon="arrow outline left" content="Back to Homepage" />
              </Link>
            </Grid.Column>
            <Grid.Column width={5} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Login;
