import React, { Component } from 'react';
import { Table, Grid, Button, Popup, Icon, Loader } from 'semantic-ui-react';
import autobind from 'react-autobind';
import StudentDelete from './StudentDelete';
import StudentEdit from './StudentEdit';
import config from '../../../config.json'
class StudentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null,
      visibleData: this.props.data,
      loading: true
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
            <Table.HeaderCell width={3}> Curriculum </Table.HeaderCell>
            <Table.HeaderCell width={3}>Status</Table.HeaderCell>
            <Table.HeaderCell width={4}>Actions</Table.HeaderCell>
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
                <Table.Cell>
                     <Grid>
                    <Grid.Row centered columns={3}>
                      <Grid.Column>
                        <StudentDelete name={user.name} student_number={user.student_number} email_add={user.email_add} curriculum={user.curriculum} status={user.status} fetchData={this.props.fetchData}/>
                      </Grid.Column>
                      <Grid.Column>
                        <StudentEdit name={user.name} student_number={user.student_number} email_add={user.email_add} curriculum={user.curriculum} status={user.status} fetchData={this.props.fetchData}/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default StudentTable;
