import { Label, Image, Card, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import './FacultyTab.css';
import ProfilePic from '../../components/ProfilePic';

class RegComCard extends Component {
  render() {
    return (
      <Card className="cardSize">
        <Segment basic={true}>
          <Card.Content>
            <Label corner="right" icon="star" color={'yellow'} />
          </Card.Content>
          <ProfilePic
            // src={image}
            centered={true}
            circular={true}
            rounded={true}
            size="small"
            email={this.props.email}
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
