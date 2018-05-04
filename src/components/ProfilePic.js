import React, { Component } from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

class ProfilePic extends Component {
  constructor(props){
    super(props)
    this.state ={
      imgURL: ' '
    }
  }
  componentDidMount() {
    fetch("http://picasaweb.google.com/data/entry/api/user/"+this.props.email+"?alt=json&size=500")
      .then(response => response.json())
      .then(data => this.setState({imgURL: data.entry.gphoto$thumbnail
.$t}));
  }

	render() {
    console.log(this.state.imgURL)
  	 return (
    <Image src={this.state.imgURL} size={this.props.size} centered={this.props.centered}
    circular={this.props.circular}
    rounded={this.props.rounded} />
		);
	}
}

export default ProfilePic;
