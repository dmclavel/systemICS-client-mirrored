import image from './sample.jpg';
import {Label, Image, Card, Button, Input, Grid, Container, Search, Header, Modal, Icon, Checkbox, Accordion, Segment} from "semantic-ui-react";
import React, { Component } from 'react';
import './section.css'

class SectionCard extends Component {
  render() {
    return(
     <Card id = "margin">
      <Card.Content  textAlign="left">
        <Image circular floated='right' size='tiny' src={image} />
        <Card.Header>
          {this.props.course_name} {this.props.section}
        </Card.Header>
        <Card.Meta>
          <Icon name="clock" />
          {this.props.day} | {this.props.timestart}-{this.props.timeend}
        </Card.Meta>
        <Card.Meta>
          {this.props.room}
        </Card.Meta>
        <Card.Meta>
          {this.props.name}
        </Card.Meta>
      </Card.Content>
    </Card>
);
  }
}

export default SectionCard;