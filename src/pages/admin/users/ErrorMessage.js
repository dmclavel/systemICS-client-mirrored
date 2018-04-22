import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';


class ErrorMessage extends Component {  
  render() {
    return(
       <Card centered color="red">
        <Card.Content>
          Please fill up all the fields.
        </Card.Content>
       </Card>
    );
  }
}

export default ErrorMessage;
