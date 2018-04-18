import image from './sample.jpg';
import { Label, Image, Card, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import './FacultyTab.css';

class RegComCard extends Component {
  render() {
    return (
      <Card className="cardSize">
        <Segment basic={true}>
          <Card.Content>
            <Label corner="right" icon="star" color={'yellow'} />
          </Card.Content>
          <Image
            src={
              'https://lh5.googleusercontent.com/-NQ_TqpxYz2M/AAAAAAAAAAI/AAAAAAAAAAs/gI0pniNvWm8/s96-c/photo.jpg'
            }
            centered={true}
            circular={true}
            rounded={true}
            size="medium"
          />
        </Segment>
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>{this.props.email}</Card.Meta>
          Registration Committee
        </Card.Content>
      </Card>
    );
  }
}

export default RegComCard;
