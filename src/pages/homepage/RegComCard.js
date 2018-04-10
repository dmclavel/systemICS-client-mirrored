import image from './sample.jpg';
import {Label, Image, Card, Button, Input, Grid, Container, Search, Header, Modal, Icon, Checkbox, Accordion, Segment} from "semantic-ui-react";
import React, { Component } from 'react';
import './FacultyTab.css';

class RegComCard extends Component {
  render() {
    return(
      <Card className = "cardSize">
      <Segment basic={true}>
        <Card.Content>
          <Label corner='right' icon="star" color={"yellow"}></Label>
        </Card.Content>
        <Image src={image} centered={true} circular={true}  rounded={true} size='medium'/>
      </Segment>
        <Card.Content>
          <Card.Header>
            {this.props.name}
          </Card.Header>
          <Card.Meta>
            {this.props.email}
          </Card.Meta>
        Registration Committee
        </Card.Content>
      </Card>
);
  }
}

export default RegComCard;