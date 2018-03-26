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
            <List.Item>{this.props.adviseeName}</List.Item>
            <List.Item>  {this.props.studentNumber}</List.Item>
            <List.Item>{this.props.email}</List.Item>
         </List>
      </Card>
    );
  }
}
export default Advisee;
