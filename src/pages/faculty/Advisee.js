import React, { Component } from 'react';
import { Card, Header } from 'semantic-ui-react';
import './Faculty.css';

class Advisee extends Component {
  render() {
    return (
      <Card fluid id="cardMargin">
        <Header
          as="h4"
          content={this.props.name}
          subheader={this.props.student_number}
        />
        <Header
          as="h6"
          className="remove-margin"
          icon="mail"
          content={this.props.email}
          size="tiny"
        />
        <Header
          className="remove-margin"
          as="h6"
          icon="calendar"
          content={this.props.curriculum}
          size="tiny"
        />
      </Card>
    );
  }
}
export default Advisee;
