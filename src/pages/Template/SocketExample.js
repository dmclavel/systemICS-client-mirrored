import React, { Component } from 'react';
import autobind from 'react-autobind';
class SocketClient extends Component{

  constructor(props){
    super(props);
    this.state = {
        endpoint: '' // the address of the server
    }
    autobind(this);
  }

  // what to do once the page (re)loads
  componentDidMount = () =>{
    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
    // listens on an endpoint and executes fallback function
    socket.on('endpoint', (returnValueFromServer) => {
      console.log(name);
    });
  }
  //a function for sending data to server.you can have many of these
  sendData = () => {
    const socket = socketIOClient(this.state.endpoint); //establish connection to the server
    socket.emit('login', 'this is my data');//send data to 'login' endpoint in server
  }

  render(){
    return(
      <Button onClick={this.sendData}></Button>
    );
  }

}

exports default SocketClient;
