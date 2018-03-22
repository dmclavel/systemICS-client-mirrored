import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';

class CourseRow extends Component {
  render() {
    return(

        <Table.Row>
          <Table.Cell>{this.props.coursecode}</Table.Cell>
          <Table.Cell>{this.props.section}</Table.Cell>
          <Table.Cell>{this.props.time}</Table.Cell>
          <Table.Cell>{this.props.room}</Table.Cell>
          <Table.Cell>{this.props.population}</Table.Cell>
          <Table.Cell>
            <Button icon="plus" positive/> <Button icon="pencil" color="teal" /> <Button negative icon="close"/>
          </Table.Cell>
        </Table.Row>
    );
  }
}

export default CourseRow;
