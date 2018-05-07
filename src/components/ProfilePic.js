import defaultImg from './defaultimg.png';
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
    fetch("https://picasaweb.google.com/data/entry/api/user/"+this.props.email+"?alt=json&size=500")
      .then(response => response.json())
      .then(data => this.setState({imgURL: data.entry.gphoto$thumbnail
.$t + "?size=500"}));
  }

	render() {
    console.log(this.state.imgURL)
  	 return (
    <Image src={this.state.imgURL !== null? this.state.imgURL : defaultImg} size={this.props.size} centered={this.props.centered}
    circular={this.props.circular}
    rounded={this.props.rounded} />
		);
	}
}

export default ProfilePic;
