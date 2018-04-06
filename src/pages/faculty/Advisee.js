import React, { Component } from 'react';
import {List, Card} from 'semantic-ui-react';
import './Faculty.css';

/*
If you wish to import other JS files, do it here.
*/

class Advisee extends Component {
  render() {
    return(
      <Card fluid id='cardMargin'>
         <List>
            <List.Item>Name: {this.props.name}</List.Item>
            <List.Item>Student number: {this.props.student_number}</List.Item>
            <List.Item>Email: {this.props.email}</List.Item>
            <List.Item>Curriculum: {this.props.curriculum}</List.Item>
         </List>
      </Card>
    );
  }
}
export default Advisee;
