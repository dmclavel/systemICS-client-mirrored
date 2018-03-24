import React, { Component } from 'react';
import { Button, Table} from 'semantic-ui-react';

class CourseRow extends Component {
  render() {
    return(

        <Table.Row>
          <Table.Cell>{this.props.course_number}</Table.Cell>
          <Table.Cell>{this.props.section}</Table.Cell>
          <Table.Cell>{this.props.time_start} - {this.props.time_end}</Table.Cell>
          <Table.Cell>{this.props.room}</Table.Cell>
          <Table.Cell negative={this.props.negative}>{this.props.students}</Table.Cell>
          <Table.Cell>{this.props.max_capacity}</Table.Cell>
          <Table.Cell>
            <Button icon="plus" positive/> <Button icon="pencil" color="teal" /> <Button negative icon="close"/>
          </Table.Cell>
        </Table.Row>
    );
  }
}

export default CourseRow;
