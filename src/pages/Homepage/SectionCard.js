import image from './sample.jpg';
import {Label, Image, Card, Button, Input, Grid, Container, Search, Header, Modal, Icon, Checkbox, Accordion, Segment} from "semantic-ui-react";
import React, { Component } from 'react';


class SectionCard extends Component {
  
  render() {
    return(
     <Card>
      <Card.Content  textAlign="left">
        <Image circular floated='left' size='tiny' src={image} />
        <Card.Header>
          CMSC 128 A-8L
        </Card.Header>
        <Card.Meta>
          <Icon name="clock" />
          2:00PM-4:00PM F
        </Card.Meta>
        <Card.Meta>
          PC Lab 7
        </Card.Meta>
        <Card.Meta>
          LK Lactuan
        </Card.Meta>
      </Card.Content>

    </Card>
);
  }
}

export default SectionCard;