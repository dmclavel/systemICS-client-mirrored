import image from './sample.jpg';
import {Label, Image, Card, Button, Input, Grid, Container, Search, Header, Modal, Icon, Checkbox, Accordion, Segment} from "semantic-ui-react";
import React, { Component } from 'react';


class RegCommCard extends Component {
  render() {
    return(
      <Card>
      <Segment basic={true}>
      	<Card.Content>
      		<Label corner='right' icon="star" color={"yellow"}></Label>
      	</Card.Content>
        <Image src={image} centered={true} circular={true} rounded={true} size='medium'/>
      </Segment>
        <Card.Content>
          <Card.Header>
            {this.props.name}
          </Card.Header>
          <Card.Meta>
            {this.props.email}
          </Card.Meta>
        
        {this.props.committee}
        </Card.Content>
      </Card>
);
  }
}

export default RegCommCard;