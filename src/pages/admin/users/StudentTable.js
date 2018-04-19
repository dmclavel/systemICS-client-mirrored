import React, { Component } from 'react';
import { Table, Grid, Button, Popup, Icon } from 'semantic-ui-react';
import autobind from 'react-autobind';

class StudentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null,
      visibleData: this.props.data
    };
    autobind(this);
  }

  render() {
    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell width={5}>Student Number</Table.HeaderCell>
            <Table.HeaderCell width={5}>Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>Email</Table.HeaderCell>
            <Table.HeaderCell width={5}> Curriculum </Table.HeaderCell>
            <Table.HeaderCell width={2}>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.data.map(user => {
            return (
              <Table.Row>
                <Table.Cell>{user.student_number}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell textAlign="center">{user.email_add}</Table.Cell>
                 <Table.Cell textAlign="center">{user.curriculum}</Table.Cell>
                <Table.Cell> {user.status} </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default StudentTable;
