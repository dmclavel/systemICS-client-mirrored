/*
AUTHOR: Gaza, John Cedric C.
FILE: Login, for the basic log-in page. Includes google sign-in.
*/

import React, { Component } from 'react';
import { Grid, Button, Form, Segment, Header, Image, Divider } from 'semantic-ui-react';
import { GoogleAPI, GoogleLogin } from 'react-google-oauth';
import socketIOClient from 'socket.io-client';
import './Login.css';
import Logo from './logo-transparent-no-stroke.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile : null,
      timestamp: 'no timestamp yet',
      endpoint: 'https://sleepy-falls-95372.herokuapp.com/',
    };
  }

  handleProfile = (googleUser) => {
    this.setState({ profile: googleUser.getBasicProfile() });
    console.log(this.state.profile);
    this.props.logInHanlder(this.state.profile.U3, 3);
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
        <Grid textAlign='center' columns={3} verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={5} />
            <Grid.Column style={{ maxWidth: 450 }}>
              <div>
                <Image className="login-name" src={Logo} size='small'/>
                {' '}<p className="login-logo-name">SYSTEMICS</p>
              </div>
              <Segment stacked>
                  <div>
                    <Form>
                      <Form.Input placeholder='Username' required icon='user' iconPosition='left' onChange={this.send}/>
                      <Form.Input placeholder='Password' required icon='lock' iconPosition='left' type='password'/>
                      <Button icon="sign in alternate" content='LOG IN' fluid color={'teal'}/>
                    </Form>
                  </div>
                  <Divider horizontal>OR</Divider>
                  <div>
                    <GoogleAPI clientId="175573341301-f0qqirbda07fqsqam42vjpoi1kldjro4.apps.googleusercontent.com"
                          onUpdateSigninStatus={Function}
                          onInitFailure={Function} >
                        <div>
                             <Button color="google plus" icon="google" content="LOG IN USING UP MAIL" fluid onLoginSuccess={this.handleProfile}/>
                        </div>
                    </GoogleAPI>
                  </div>
              </Segment> 
            </Grid.Column>
            <Grid.Column width={5} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Login;
