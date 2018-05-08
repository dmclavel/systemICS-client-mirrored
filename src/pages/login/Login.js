/*
AUTHOR: Gaza, John Cedric C.
FILE: Login, for the basic log-in page. Includes google sign-in.
*/

import React, { Component } from 'react';
import {
  Grid,
  Button,
  Form,
  Segment,
  Image,
  Divider,
  Message
} from 'semantic-ui-react';
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
      success: true,
      loading: false,
      message: '',
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.address);
    socket.on('view_faculty', res => {
      console.log(res);
    });
  }

  handleProfile = googleUser => {
    this.setState({ loading: true });
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('view_faculty', { email_add: googleUser.getBasicProfile().U3 });
    socket.on('view_faculty', res => {
      if (res !== {}) {
        this.setState({
          accessLvl: res.isRegCom,
          success: true,
          loading: false
        });
        this.props.logInHandler(googleUser.getBasicProfile(), res.isRegCom);
        window.location = '/';
      } else {
        this.setState({
          success: false,
          loading: false,
          message: `${
            googleUser.getBasicProfile().U3
          } is not found in database.`
        });
      }
    });
  };

  handleChange = (e, data) => {
    const state = this.state;
    state[e.target.name] = data.value;
    state['success'] = true;
    this.setState(state);
  };

  handleSubmit = e => {
    e.preventDefault();

    if (
      this.state.username.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      const socket = socketIOClient(this.state.endpoint);
      const data = { email_add: this.state.username };

      socket.on('view_faculty', res => {
        console.log(res);
        if (res === []) console.log('Not found');
        else console.log('Found');
      });

      socket.emit('view_faculty', data);
    } else {
      this.setState({ message: 'Wrong credentials!', success: false });
    }
  };

  render() {
    const { success, message, loading } = this.state;
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
