import image from './sample.jpg';
import { Image, Card, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import './FacultyTab.css';

class FacultyCard extends Component {
  render() {
    return (
      <Card className="cardSize">
        <Segment basic={true}>
          <Image
            src={image}
            centered={true}
            circular={true}
            rounded={true}
            size="medium"
          />
        </Segment>
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>{this.props.email}</Card.Meta>
          Faculty
        </Card.Content>
      </Card>
    );
  }
}

export default FacultyCard;
