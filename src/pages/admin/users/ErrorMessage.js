import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';


class ErrorMessage extends Component {  
  render() {
    return(
       <Message warning>
          Please fill up all the fields.
      </Message>
    );
  }
}

export default ErrorMessage;
