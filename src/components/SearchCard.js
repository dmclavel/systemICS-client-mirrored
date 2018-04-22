import React, { Component } from 'react';
import { Segment, Input, Card } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import autobind from 'react-autobind';

class SearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: 'https://sleepy-falls-95372.herokuapp.com/',
      allData: [],
      visibleData: [],
      query: ''
    };
    autobind(this);
  }

  componentDidMount = () => {
    // fetch all users
    // const socket = socketIOClient(this.state.address);
    // socket.emit('');
  };

  //
  handleInputChange = e => {
    // this.setState({query: e.target.value});
    this.props.handleSearch(e.target.value);
  };

  // handleSearch = () =>{
  //   this.props.handleSearch(this.state.query);
  // }

  render() {
    return (
    <Card fluid={this.props.fluid} raised>
      <Input
        fluid
        icon="search"
        onChange={this.handleInputChange}
        placeholder={this.props.placeholder}
      />
  </Card>
  );
  }
}

export default SearchCard;
